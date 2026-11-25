import { getPool, json, withJsonErrorHandling } from '../_db.js';

export const config = { runtime: 'nodejs' };

export const POST = withJsonErrorHandling(async function handler(req: Request): Promise<Response> {
  const body = await req.json() as Record<string, unknown>;
  const nim            = String(body.nim || '').trim().toUpperCase();
  const xp             = Number(body.xp);
  const playerLevel    = Number(body.playerLevel);
  const completedLevels = Array.isArray(body.completedLevels) ? body.completedLevels : null;
  const achievements    = Array.isArray(body.achievements)    ? body.achievements    : null;
  const totalTimeSeconds = Number(body.totalTimeSeconds);
  const levelTimes = (typeof body.levelTimes === 'object' && body.levelTimes !== null) ? body.levelTimes : null;

  if (!nim) {
    return json({ success: false, error: 'NIM diperlukan untuk sinkronisasi.' }, 400);
  }

  const pool = getPool();

  const upd = await pool.query(
    `UPDATE public.users
     SET
       xp             = GREATEST(xp, COALESCE($2, xp)),
       player_level   = GREATEST(player_level, COALESCE($3, player_level)),
       completed_levels = CASE WHEN $4::text[] IS NOT NULL
                           THEN (SELECT array_agg(DISTINCT elem) FROM unnest(completed_levels || $4::text[]) elem)
                           ELSE completed_levels END,
       achievements   = CASE WHEN $5::text[] IS NOT NULL
                           THEN (SELECT array_agg(DISTINCT elem) FROM unnest(achievements || $5::text[]) elem)
                           ELSE achievements END,
       total_time_seconds = CASE WHEN $6::int > 0 THEN $6::int ELSE total_time_seconds END,
       level_times    = CASE WHEN $7::jsonb IS NOT NULL AND $7::jsonb != '{}'::jsonb
                           THEN level_times || $7::jsonb ELSE level_times END,
       last_login     = now()
     WHERE nim = $1
     RETURNING id, nama, nim, xp, player_level, completed_levels, achievements,
               total_time_seconds, level_times, last_login`,
    [
      nim,
      isNaN(xp)             ? null : xp,
      isNaN(playerLevel)    ? null : playerLevel,
      completedLevels,
      achievements,
      isNaN(totalTimeSeconds) ? null : totalTimeSeconds,
      levelTimes ? JSON.stringify(levelTimes) : null,
    ]
  );

  if (upd.rows.length === 0) {
    return json({ success: false, error: 'User tidak ditemukan.' }, 404);
  }

  const u = upd.rows[0];
  return json({
    success: true,
    message: 'Progress berhasil disinkronkan ke Supabase!',
    user: {
      id: u.id, nama: u.nama, nim: u.nim,
      xp: u.xp, playerLevel: u.player_level,
      completedLevels: u.completed_levels,
      achievements: u.achievements,
      totalTimeSeconds: u.total_time_seconds,
      levelTimes: u.level_times,
      lastLogin: u.last_login,
    },
  });
});

export function OPTIONS(): Response {
  return json({}, 204);
}

