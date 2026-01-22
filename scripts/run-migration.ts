import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('🚀 Starting update images migration...');
    
    const migrationPath = path.join(__dirname, '../database/migrations/005_update_images.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');

    await client.query('BEGIN');
    await client.query(migrationSql);
    await client.query('COMMIT');
    
    console.log('✅ Images updated successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
