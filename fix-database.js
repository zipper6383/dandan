import { readFileSync } from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function fixDatabase() {
  console.log('🔧 Starting database fix...\n');

  try {
    // Read the SQL file
    const sql = readFileSync('./database/fix-database.sql', 'utf8');

    // Execute the SQL
    console.log('📝 Running fix script...');
    const result = await pool.query(sql);

    console.log('✅ Database fix completed successfully!\n');

    // Show results
    if (result.rows && result.rows.length > 0) {
      console.log('📊 Verification Results:');
      result.rows.forEach((row) => {
        console.log(`   ${row.info}: ${row.count}`);
      });
    }

    // Test categories API
    console.log('\n🧪 Testing categories...');
    const categoriesResult = await pool.query(`
      SELECT type, COUNT(*) as count
      FROM categories
      GROUP BY type
      ORDER BY type
    `);

    console.log('   Categories by type:');
    categoriesResult.rows.forEach((row) => {
      console.log(`   - ${row.type}: ${row.count}`);
    });

    // Test about content
    console.log('\n🧪 Testing about content...');
    const aboutResult = await pool.query(`
      SELECT section, title
      FROM about_content
      WHERE is_active = true
      ORDER BY sort_order
    `);

    console.log('   About sections:');
    aboutResult.rows.forEach((row) => {
      console.log(`   - ${row.section}: ${row.title}`);
    });

    console.log('\n✨ All fixes applied successfully!');
    console.log('🚀 You can now run the tests again.\n');
  } catch (error) {
    console.error('❌ Error fixing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixDatabase();
