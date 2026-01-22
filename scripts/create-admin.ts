import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createAdmin() {
  const client = await pool.connect();
  try {
    const username = 'admin';
    const password = 'admin';
    const role = 'admin';
    
    console.log(`🔑 Creating/Updating admin user...`);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Check if exists
    const res = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (res.rows.length > 0) {
      // Update
      await client.query('UPDATE users SET password_hash = $1, role = $2 WHERE username = $3', [hashedPassword, role, username]);
      console.log('✅ Admin user updated.');
    } else {
      // Insert
      await client.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)', [username, hashedPassword, role]);
      console.log('✅ Admin user created.');
    }
    
  } catch (error) {
    console.error('❌ Failed to create admin:', error);
  } finally {
    client.release();
    pool.end();
  }
}

createAdmin();
