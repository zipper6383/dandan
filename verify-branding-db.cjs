const { Pool } = require('pg');
require('dotenv').config();

async function verifyBranding() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔍 Verifying branding updates in database...\n');

    // Check site_config
    const configResult = await pool.query(
      "SELECT key, value FROM site_config WHERE value::text LIKE '%长安慈善会%' OR value::text LIKE '%西安市慈善会%'"
    );
    console.log('📋 Site Config:');
    configResult.rows.forEach((row) => {
      console.log(`   ${row.key}: ${JSON.stringify(row.value, null, 2)}`);
    });

    // Check news
    const newsResult = await pool.query(
      "SELECT id, title, author FROM news WHERE title LIKE '%慈善会%' OR author LIKE '%慈善会%' LIMIT 5"
    );
    console.log('\n📰 News (sample):');
    newsResult.rows.forEach((row) => {
      console.log(`   [${row.id}] ${row.title} (by ${row.author})`);
    });

    // Check projects
    const projectsResult = await pool.query(
      "SELECT id, title FROM projects WHERE title LIKE '%慈善会%' OR description LIKE '%慈善会%' LIMIT 5"
    );
    console.log('\n🎯 Projects (sample):');
    projectsResult.rows.forEach((row) => {
      console.log(`   [${row.id}] ${row.title}`);
    });

    // Check funds
    const fundsResult = await pool.query(
      "SELECT id, name, manager FROM funds WHERE name LIKE '%慈善会%' OR manager LIKE '%慈善会%' LIMIT 5"
    );
    console.log('\n💰 Funds (sample):');
    fundsResult.rows.forEach((row) => {
      console.log(`   [${row.id}] ${row.name} (manager: ${row.manager})`);
    });

    // Summary
    console.log('\n📊 Summary:');
    const summary = await pool.query(`
      SELECT 'site_config' as table_name, COUNT(*) as count
      FROM site_config WHERE value::text LIKE '%长安慈善会%'
      UNION ALL
      SELECT 'news', COUNT(*) FROM news WHERE title LIKE '%长安慈善会%' OR author = '长安慈善会' OR content LIKE '%长安慈善会%'
      UNION ALL
      SELECT 'projects', COUNT(*) FROM projects WHERE title LIKE '%长安慈善会%' OR description LIKE '%长安慈善会%' OR content LIKE '%长安慈善会%'
      UNION ALL
      SELECT 'funds', COUNT(*) FROM funds WHERE name LIKE '%长安慈善会%' OR description LIKE '%长安慈善会%' OR manager LIKE '%长安慈善会%'
    `);
    summary.rows.forEach((row) => {
      console.log(`   ${row.table_name}: ${row.count} records with 长安慈善会`);
    });

    console.log('\n✅ Verification complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

verifyBranding();
