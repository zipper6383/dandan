import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function checkImages() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    console.log('--- News Images ---');
    const newsRes = await client.query(
      'SELECT id, title, image_url FROM news ORDER BY published_at DESC LIMIT 50'
    );
    newsRes.rows.forEach((row) => {
      if (
        row.image_url &&
        (row.image_url.includes('西安') ||
          row.image_url.includes('xian') ||
          !row.image_url.startsWith('http'))
      ) {
        console.log(`[News ${row.id}] ${row.title}: ${row.image_url}`);
      } else if (!row.image_url) {
        console.log(`[News ${row.id}] ${row.title}: NO IMAGE`);
      }
    });

    console.log('\n--- Projects Images ---');
    const projectRes = await client.query('SELECT id, title, image_url FROM projects LIMIT 50');
    projectRes.rows.forEach((row) => {
      if (row.image_url) {
        console.log(`[Project ${row.id}] ${row.title}: ${row.image_url}`);
      } else {
        console.log(`[Project ${row.id}] ${row.title}: NO IMAGE`);
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

checkImages();
