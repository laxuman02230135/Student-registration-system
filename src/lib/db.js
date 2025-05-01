// lib/db.js
import { Pool } from 'pg';

let pool;

if (!global.pgPool) {
  global.pgPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'college',
    password: 'Laxu11',
    port: 5432,
  });
}

pool = global.pgPool;

export default pool;
