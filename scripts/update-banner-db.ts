
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const NEW_BANNER_PATH = '/images/longgang-banner.png';

async function updateBanners() {
  const client = await pool.connect();
  try {
    console.log('🔄 Updating banners in Database...');
    await client.query('BEGIN');

    // 1. Update site_config table
    const configUpdates = {
      headerImage: NEW_BANNER_PATH,
      banners: [NEW_BANNER_PATH],
      projectsBanner: NEW_BANNER_PATH,
    };

    for (const [key, value] of Object.entries(configUpdates)) {
      await client.query(
        `INSERT INTO site_config (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = $2`,
        [key, JSON.stringify(value)]
      );
      console.log(`✅ Updated site_config key: ${key}`);
    }

    // 2. Clear old banners table to avoid confusion (optional, but good for cleanup)
    // Or we can update it to point to the new banner
    await client.query('DELETE FROM banners');
    await client.query(
      `INSERT INTO banners (title, image_url, sort_order, is_active)
       VALUES ($1, $2, $3, $4)`,
      ['Main Banner', NEW_BANNER_PATH, 1, true]
    );
    console.log('✅ Updated banners table');

    await client.query('COMMIT');
    console.log('🎉 All banner configurations updated successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to update banners:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

updateBanners();
