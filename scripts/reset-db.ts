
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

async function resetDb() {
  const client = await pool.connect();
  try {
    console.log('🚀 Starting database reset...\n');
    
    // Step 1: Run schema.sql
    console.log('📋 Running schema.sql...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    await client.query('BEGIN');
    await client.query(schemaSql);
    console.log('✅ Schema applied successfully.\n');

    // Step 2: Run seed.sql
    console.log('🌱 Running seed.sql...');
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    
    await client.query(seedSql);
    await client.query('COMMIT');
    console.log('✅ Seed data applied successfully.\n');

    console.log('✅ Database reset completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database reset failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

resetDb();
