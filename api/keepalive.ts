import { getPool, json, withJsonErrorHandling } from './_db.js';

export const config = { runtime: 'nodejs' };

/**
 * Keep-alive endpoint invoked automatically by Vercel Cron to keep the
 * Supabase PostgreSQL database active and prevent 7-day inactivity pausing.
 */
export const GET = withJsonErrorHandling(async function handler(req: Request): Promise<Response> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return json({ success: false, error: 'Unauthorized' }, 401);
    }
  }

  const pool = getPool();
  const result = await pool.query(
    'SELECT COUNT(*)::int AS total_users, NOW() AS db_time FROM public.users'
  );
  const row = result.rows[0];

  return json({
    success: true,
    status: 'alive',
    totalUsers: Number(row?.total_users) || 0,
    dbTime: row?.db_time,
    checkedAt: new Date().toISOString(),
  });
});

export function OPTIONS(): Response {
  return json({}, 204);
}

