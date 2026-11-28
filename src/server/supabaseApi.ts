import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import pg from 'pg';

const { Pool } = pg;

const DB_CONNECTION_STRING =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ozpchgvcfypgeutzszsk:1234534314563423@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres';

let poolInstance: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: DB_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
    });
  }
  return poolInstance;
}

export function hashPassword(password: string, nim: string): string {
  return createHash('sha256')
    .update(`${password}:${nim}:codequest_salt`)
    .digest('hex');
}

function parseJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export async function handleAuthApi(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const pool = getPool();

  try {
    // POST /api/auth/register
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const nama = String(body.nama || '').trim();
      const nim = String(body.nim || '').trim().toUpperCase();
      const password = String(body.password || '');
      const xp = Number(body.xp) || 0;
      const playerLevel = Number(body.playerLevel) || 1;
      const completedLevels = Array.isArray(body.completedLevels) ? body.completedLevels : [];
      const achievements = Array.isArray(body.achievements) ? body.achievements : [];
      const totalTimeSeconds = Number(body.totalTimeSeconds) || 0;
      const levelTimes = typeof body.levelTimes === 'object' && body.levelTimes !== null ? body.levelTimes : {};

      if (!nama || !nim || !password) {
        return sendJson(res, 400, {
          success: false,
          error: 'Nama, NIM, dan password wajib diisi.',
        });
      }

      if (password.length < 6) {
        return sendJson(res, 400, {
          success: false,
          error: 'Password minimal 6 karakter.',
        });
      }

      const pwHash = hashPassword(password, nim);

      // Check if NIM already registered
      const checkRes = await pool.query(
        'SELECT id FROM public.users WHERE nim = $1',
        [nim]
      );
      if (checkRes.rows.length > 0) {
        return sendJson(res, 409, {
          success: false,
          error: `NIM ${nim} sudah terdaftar. Silakan pilih tab Masuk (Login).`,
        });
      }

      const insertRes = await pool.query(
        `INSERT INTO public.users 
          (nama, nim, password_hash, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, created_at, last_login)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), now())
         RETURNING id, nama, nim, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, created_at, last_login;`,
        [nama, nim, pwHash, xp, playerLevel, completedLevels, achievements, totalTimeSeconds, JSON.stringify(levelTimes)]
      );

      const user = insertRes.rows[0];
      return sendJson(res, 201, {
        success: true,
        message: 'Registrasi berhasil!',
        user: {
          id: user.id,
          nama: user.nama,
          nim: user.nim,
          xp: user.xp,
          playerLevel: user.player_level,
          completedLevels: user.completed_levels,
          achievements: user.achievements,
          totalTimeSeconds: user.total_time_seconds,
          levelTimes: user.level_times,
          createdAt: user.created_at,
          lastLogin: user.last_login,
        },
      });
    }

    // POST /api/auth/login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const nim = String(body.nim || '').trim().toUpperCase();
      const password = String(body.password || '');

      if (!nim || !password) {
        return sendJson(res, 400, {
          success: false,
          error: 'NIM dan password wajib diisi.',
        });
      }

      const pwHash = hashPassword(password, nim);
      const userRes = await pool.query(
        `SELECT id, nama, nim, password_hash, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, created_at, last_login
         FROM public.users WHERE nim = $1;`,
        [nim]
      );

      if (userRes.rows.length === 0) {
        return sendJson(res, 404, {
          success: false,
          error: `NIM ${nim} belum terdaftar. Silakan daftar akun baru terlebih dahulu.`,
        });
      }

      const user = userRes.rows[0];
      if (user.password_hash !== pwHash) {
        return sendJson(res, 401, {
          success: false,
          error: 'Password yang kamu masukkan salah.',
        });
      }

      // Update last_login
      await pool.query('UPDATE public.users SET last_login = now() WHERE id = $1', [user.id]);

      return sendJson(res, 200, {
        success: true,
        message: 'Login berhasil!',
        user: {
          id: user.id,
          nama: user.nama,
          nim: user.nim,
          xp: user.xp,
          playerLevel: user.player_level,
          completedLevels: user.completed_levels,
          achievements: user.achievements,
          totalTimeSeconds: user.total_time_seconds,
          levelTimes: user.level_times,
          createdAt: user.created_at,
          lastLogin: new Date().toISOString(),
        },
      });
    }

    // POST /api/auth/sync
    if (pathname === '/api/auth/sync' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const nim = String(body.nim || '').trim().toUpperCase();
      const xp = Number(body.xp);
      const playerLevel = Number(body.playerLevel);
      const completedLevels = Array.isArray(body.completedLevels) ? body.completedLevels : null;
      const achievements = Array.isArray(body.achievements) ? body.achievements : null;
      const totalTimeSeconds = Number(body.totalTimeSeconds);
      const levelTimes = typeof body.levelTimes === 'object' && body.levelTimes !== null ? body.levelTimes : null;

      if (!nim) {
        return sendJson(res, 400, { success: false, error: 'NIM diperlukan untuk sinkronisasi.' });
      }

      const updateRes = await pool.query(
        `UPDATE public.users 
         SET 
           xp = GREATEST(xp, COALESCE($2, xp)),
           player_level = GREATEST(player_level, COALESCE($3, player_level)),
           completed_levels = CASE WHEN $4::text[] IS NOT NULL THEN (SELECT array_agg(DISTINCT elem) FROM unnest(completed_levels || $4::text[]) elem) ELSE completed_levels END,
           achievements = CASE WHEN $5::text[] IS NOT NULL THEN (SELECT array_agg(DISTINCT elem) FROM unnest(achievements || $5::text[]) elem) ELSE achievements END,
           total_time_seconds = CASE WHEN $6::int > 0 THEN $6::int ELSE total_time_seconds END,
           level_times = CASE WHEN $7::jsonb IS NOT NULL AND $7::jsonb != '{}'::jsonb THEN level_times || $7::jsonb ELSE level_times END,
           last_login = now()
         WHERE nim = $1
         RETURNING id, nama, nim, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, last_login;`,
        [
          nim,
          isNaN(xp) ? null : xp,
          isNaN(playerLevel) ? null : playerLevel,
          completedLevels,
          achievements,
          isNaN(totalTimeSeconds) ? null : totalTimeSeconds,
          levelTimes ? JSON.stringify(levelTimes) : null,
        ]
      );

      if (updateRes.rows.length === 0) {
        return sendJson(res, 404, { success: false, error: 'User tidak ditemukan.' });
      }

      const user = updateRes.rows[0];
      return sendJson(res, 200, {
        success: true,
        message: 'Progress berhasil disinkronkan ke Supabase!',
        user: {
          id: user.id,
          nama: user.nama,
          nim: user.nim,
          xp: user.xp,
          playerLevel: user.player_level,
          completedLevels: user.completed_levels,
          achievements: user.achievements,
          totalTimeSeconds: user.total_time_seconds,
          levelTimes: user.level_times,
          lastLogin: user.last_login,
        },
      });
    }

    // GET /api/leaderboard
    if (pathname === '/api/leaderboard' && req.method === 'GET') {
      const mode = url.searchParams.get('mode') || 'time';

      let orderClause = `
        cardinality(completed_levels) DESC,
        CASE WHEN total_time_seconds > 0 THEN total_time_seconds ELSE 999999 END ASC,
        xp DESC
      `;

      if (mode === 'fastest') {
        orderClause = `
          CASE WHEN total_time_seconds > 0 THEN total_time_seconds ELSE 999999 END ASC,
          cardinality(completed_levels) DESC,
          xp DESC
        `;
      }

      const rowsRes = await pool.query(`
        SELECT 
          id, 
          nama, 
          nim, 
          xp, 
          player_level, 
          completed_levels, 
          cardinality(completed_levels) as completed_count,
          total_time_seconds, 
          level_times,
          created_at,
          last_login
        FROM public.users
        ORDER BY ${orderClause}
        LIMIT 50;
      `);

      const leaderboard = rowsRes.rows.map((r, idx) => ({
        rank: idx + 1,
        id: r.id,
        nama: r.nama,
        nim: r.nim,
        xp: r.xp,
        playerLevel: r.player_level,
        completedLevels: r.completed_levels || [],
        completedCount: Number(r.completed_count) || (r.completed_levels ? r.completed_levels.length : 0),
        totalTimeSeconds: Number(r.total_time_seconds) || 0,
        levelTimes: r.level_times || {},
        lastLogin: r.last_login,
      }));

      return sendJson(res, 200, {
        success: true,
        leaderboard,
      });
    }

    // GET /api/keepalive
    if (pathname === '/api/keepalive' && req.method === 'GET') {
      const keepaliveRes = await pool.query(
        'SELECT COUNT(*)::int AS total_users, NOW() AS db_time FROM public.users'
      );
      const row = keepaliveRes.rows[0];
      return sendJson(res, 200, {
        success: true,
        status: 'alive',
        totalUsers: Number(row?.total_users) || 0,
        dbTime: row?.db_time,
        checkedAt: new Date().toISOString(),
      });
    }

    return sendJson(res, 404, { success: false, error: 'Endpoint tidak ditemukan.' });
  } catch (err: unknown) {
    console.error('API Error:', err);
    return sendJson(res, 500, {
      success: false,
      error: 'Terjadi kesalahan server database Supabase: ' + (err instanceof Error ? err.message : String(err)),
    });
  }
}
