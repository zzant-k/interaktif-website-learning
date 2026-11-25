import { getPool, hashPassword, json } from '../_db';

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return json({}, 204);
  if (req.method !== 'POST') return json({ success: false, error: 'Method not allowed' }, 405);

  const body = await req.json() as Record<string, unknown>;
  const nim      = String(body.nim      || '').trim().toUpperCase();
  const password = String(body.password || '');

  if (!nim || !password) {
    return json({ success: false, error: 'NIM dan password wajib diisi.' }, 400);
  }

  const pool = getPool();
  const pwHash = hashPassword(password, nim);

  const res = await pool.query(
    `SELECT id, nama, nim, password_hash, xp, player_level, completed_levels, achievements,
            total_time_seconds, level_times, created_at, last_login
     FROM public.users WHERE nim = $1`,
    [nim]
  );

  if (res.rows.length === 0) {
    return json({ success: false, error: `NIM ${nim} belum terdaftar. Silakan daftar akun baru terlebih dahulu.` }, 404);
  }

  const u = res.rows[0];
  if (u.password_hash !== pwHash) {
    return json({ success: false, error: 'Password yang kamu masukkan salah.' }, 401);
  }

  await pool.query('UPDATE public.users SET last_login = now() WHERE id = $1', [u.id]);

  return json({
    success: true,
    message: 'Login berhasil!',
    user: {
      id: u.id, nama: u.nama, nim: u.nim,
      xp: u.xp, playerLevel: u.player_level,
      completedLevels: u.completed_levels,
      achievements: u.achievements,
      totalTimeSeconds: u.total_time_seconds,
      levelTimes: u.level_times,
      createdAt: u.created_at, lastLogin: new Date().toISOString(),
    },
  });
}
