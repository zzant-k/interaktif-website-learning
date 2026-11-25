import { createHash } from 'node:crypto';
import pg from 'pg';

const { Pool } = pg;

let _pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL ||
        'postgresql://postgres:1234534314563423@db.ozpchgvcfypgeutzszsk.supabase.co:5432/postgres',
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

