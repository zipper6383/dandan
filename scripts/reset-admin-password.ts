
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function updateAdminPassword() {
  const password = 'admin';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(`🔑 Generated Hash for '${password}': ${hashedPassword}`);

  try {
    const client = await pool.connect();
    // Update or Insert admin user
    // First try update
    const updateRes = await client.query(
        "UPDATE users SET password_hash = $1 WHERE username = 'admin' RETURNING id",
        [hashedPassword]
    );

    if (updateRes.rowCount === 0) {
        console.log('⚠️ Admin user not found. Creating new admin user...');
        await client.query(
            "INSERT INTO users (username, password_hash, role) VALUES ('admin', $1, 'admin')",
            [hashedPassword]
        );
        console.log('✅ Admin user created.');
    } else {
        console.log('✅ Admin password updated.');
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Error updating password:', err);
  } finally {
    await pool.end();
  }
}

updateAdminPassword();
