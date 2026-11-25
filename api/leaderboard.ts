import { getPool, json, withJsonErrorHandling } from './_db.js';
// leaderboard.ts lives at api/leaderboard.ts, _db.ts at api/_db.ts

export const config = { runtime: 'nodejs' };

export default withJsonErrorHandling(async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return json({}, 204);
  if (req.method !== 'GET') return json({ success: false, error: 'Method not allowed' }, 405);

  const url  = new URL(req.url);
  const mode = url.searchParams.get('mode') || 'time';

  const orderClause = mode === 'fastest'
    ? `CASE WHEN total_time_seconds > 0 THEN total_time_seconds ELSE 999999 END ASC,
       cardinality(completed_levels) DESC, xp DESC`
    : `cardinality(completed_levels) DESC,
       CASE WHEN total_time_seconds > 0 THEN total_time_seconds ELSE 999999 END ASC,
       xp DESC`;

  const pool = getPool();
  const rows = await pool.query(`
    SELECT id, nama, nim, xp, player_level, completed_levels,
           cardinality(completed_levels) AS completed_count,
           total_time_seconds, level_times, created_at, last_login
    FROM public.users
    ORDER BY ${orderClause}
    LIMIT 50
  `);

  const leaderboard = rows.rows.map((r, idx) => ({
    rank: idx + 1,
    id: r.id, nama: r.nama, nim: r.nim,
    xp: r.xp, playerLevel: r.player_level,
    completedLevels: r.completed_levels || [],
    completedCount:  Number(r.completed_count) || 0,
    totalTimeSeconds: Number(r.total_time_seconds) || 0,
    levelTimes: r.level_times || {},
    lastLogin: r.last_login,
  }));

  return json({ success: true, leaderboard });
});
