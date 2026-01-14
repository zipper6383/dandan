const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

async function updateBranding() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔄 Starting branding update in database...\n');

    // Read SQL file
    const sql = fs.readFileSync('update-branding-db.sql', 'utf8');

    // Execute SQL
    const result = await pool.query(sql);

    console.log('✅ Database updated successfully!\n');

    // Show results
    if (result && result.rows) {
      console.log('📊 Update Summary:');
      result.rows.forEach((row) => {
        console.log(`   ${row.table_name}: ${row.updated_count} records`);
      });
    }

    console.log('\n✅ Branding update completed!');
  } catch (error) {
    console.error('❌ Error updating database:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateBranding();
