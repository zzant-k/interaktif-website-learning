import { createHash } from 'node:crypto';
import pg from 'pg';

const { Pool } = pg;

let _pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL ||
        'postgresql://postgres.ozpchgvcfypgeutzszsk:1234534314563423@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres',
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 20000,
    });
  }
  return _pool;
}

export function hashPassword(password: string, nim: string): string {
  return createHash('sha256')
    .update(`${password}:${nim}:codequest_salt`)
    .digest('hex');
}

export function cors(res: Response): void {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export function withJsonErrorHandling(
  fn: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    try {
      return await fn(req);
    } catch (err: unknown) {
      console.error('Vercel API Error:', err);
      return json(
        {
          success: false,
          error:
            'Terjadi kesalahan server database Supabase: ' +
            (err instanceof Error ? err.message : String(err)),
        },
        500
      );
    }
  };
}

