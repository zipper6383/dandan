import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function auditDatabase() {
  try {
    const keyword = '长安';
    console.log(`Auditing database for keyword: "${keyword}"...`);

    const tables = [
      { name: 'projects', columns: ['title', 'content', 'description'] },
      { name: 'news', columns: ['title', 'content', 'summary'] },
      { name: 'funds', columns: ['name', 'description'] },
      { name: 'site_config', columns: ['value'] },
      { name: 'volunteers', columns: ['name', 'skills'] },
    ];

    let found = false;

    for (const table of tables) {
      for (const column of table.columns) {
        let query = `SELECT id, ${column} FROM ${table.name} WHERE ${column} LIKE $1 LIMIT 5`;
        if (table.name === 'site_config' && column === 'value') {
          query = `SELECT id, ${column} FROM ${table.name} WHERE ${column}::text LIKE $1 LIMIT 5`;
        }

        const res = await pool.query(query, [`%${keyword}%`]);

        if (res.rows.length > 0) {
          found = true;
          console.log(`Found in table '${table.name}', column '${column}':`);
          res.rows.forEach((row) => {
            console.log(
              `  - ID: ${row.id}, Content snippet: ${String(row[column]).substring(0, 50)}...`
            );
          });
        }
      }
    }

    if (!found) {
      console.log('No occurrences found in database.');
    }
  } catch (error) {
    console.error('Audit failed:', error);
  } finally {
    await pool.end();
  }
}

auditDatabase();
