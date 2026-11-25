import { getPool, hashPassword, json, withJsonErrorHandling } from '../_db.js';

export const config = { runtime: 'nodejs' };

export default withJsonErrorHandling(async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return json({}, 204);
  if (req.method !== 'POST') return json({ success: false, error: 'Method not allowed' }, 405);

  const body = await req.json() as Record<string, unknown>;
  const nama = String(body.nama || '').trim();
  const nim  = String(body.nim  || '').trim().toUpperCase();
  const password = String(body.password || '');
  const xp = Number(body.xp) || 0;
  const playerLevel = Number(body.playerLevel) || 1;
  const completedLevels = Array.isArray(body.completedLevels) ? body.completedLevels : [];
  const achievements    = Array.isArray(body.achievements)    ? body.achievements    : [];
  const totalTimeSeconds = Number(body.totalTimeSeconds) || 0;
  const levelTimes = (typeof body.levelTimes === 'object' && body.levelTimes !== null) ? body.levelTimes : {};

  if (!nama || !nim || !password) {
    return json({ success: false, error: 'Nama, NIM, dan password wajib diisi.' }, 400);
  }
  if (password.length < 6) {
    return json({ success: false, error: 'Password minimal 6 karakter.' }, 400);
  }

  const pool = getPool();
  const pwHash = hashPassword(password, nim);

  const existing = await pool.query('SELECT id FROM public.users WHERE nim = $1', [nim]);
  if (existing.rows.length > 0) {
    return json({ success: false, error: `NIM ${nim} sudah terdaftar. Silakan pilih tab Masuk (Login).` }, 409);
  }

  const ins = await pool.query(
    `INSERT INTO public.users
       (nama, nim, password_hash, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, created_at, last_login)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,now(),now())
     RETURNING id, nama, nim, xp, player_level, completed_levels, achievements, total_time_seconds, level_times, created_at, last_login`,
    [nama, nim, pwHash, xp, playerLevel, completedLevels, achievements, totalTimeSeconds, JSON.stringify(levelTimes)]
  );

  const u = ins.rows[0];
  return json({
    success: true,
    message: 'Registrasi berhasil!',
    user: {
      id: u.id, nama: u.nama, nim: u.nim,
      xp: u.xp, playerLevel: u.player_level,
      completedLevels: u.completed_levels,
      achievements: u.achievements,
      totalTimeSeconds: u.total_time_seconds,
      levelTimes: u.level_times,
      createdAt: u.created_at, lastLogin: u.last_login,
    },
  }, 201);
});

