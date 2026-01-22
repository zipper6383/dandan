import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runRegressionTest() {
  console.log('🚀 Starting Regression Test...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const BASE_URL = 'http://localhost:3000';

  // Create test-results directory if not exists
  const resultsDir = path.join(__dirname, '../test-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  try {
    // 1. Visit Home Page
    console.log(`\n📄 Visiting Home Page: ${BASE_URL}`);
    await page.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });

    // Check for "长安" (Should be 0)
    const changanCount = await page.getByText('长安').count();
    if (changanCount > 0) {
      console.error(`❌ Found ${changanCount} occurrences of "长安" on Home Page!`);
    } else {
      console.log('✅ No "长安" found on Home Page.');
    }

    // Check for "龙岗" (Should be > 0)
    const longgangCount = await page.getByText('龙岗').count();
    if (longgangCount > 0) {
      console.log(`✅ Found ${longgangCount} occurrences of "龙岗" on Home Page.`);
    } else {
      console.warn('⚠️ No "龙岗" found on Home Page. This might be unexpected.');
    }

    // Check for broken images
    const images = await page.evaluate(() => {
      return Array.from(document.images).map((img) => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
      }));
    });
    const brokenImages = images.filter((img) => img.naturalWidth === 0);
    if (brokenImages.length > 0) {
      console.warn(`⚠️ Found ${brokenImages.length} potentially broken images on Home Page:`);
      brokenImages.forEach((img) => console.warn(`   - ${img.src}`));
    } else {
      console.log('✅ All images loaded correctly on Home Page.');
    }

    // 2. Visit Projects Page
    console.log(`\n📄 Visiting Projects Page: ${BASE_URL}/#/projects`);
    await page.goto(`${BASE_URL}/#/projects`, { waitUntil: 'networkidle' });
    const changanCountProj = await page.getByText('长安').count();
    if (changanCountProj > 0) {
      console.error(`❌ Found ${changanCountProj} occurrences of "长安" on Projects Page!`);
    } else {
      console.log('✅ No "长安" found on Projects Page.');
    }

    // 3. Visit News Page
    console.log(`\n📄 Visiting News Page: ${BASE_URL}/#/news`);
    await page.goto(`${BASE_URL}/#/news`, { waitUntil: 'networkidle' });
    const changanCountNews = await page.getByText('长安').count();
    if (changanCountNews > 0) {
      console.error(`❌ Found ${changanCountNews} occurrences of "长安" on News Page!`);
    } else {
      console.log('✅ No "长安" found on News Page.');
    }

    // 4. Visit Volunteer Page
    console.log(`\n📄 Visiting Volunteer Page: ${BASE_URL}/#/volunteer`);
    await page.goto(`${BASE_URL}/#/volunteer`, { waitUntil: 'networkidle' });
    const changanCountVol = await page.getByText('长安').count();
    if (changanCountVol > 0) {
      console.error(`❌ Found ${changanCountVol} occurrences of "长安" on Volunteer Page!`);
    } else {
      console.log('✅ No "长安" found on Volunteer Page.');
    }

    // 5. Admin Login & Dashboard Test
    console.log(`\n🔐 Testing Admin Login & Dashboard...`);
    await page.goto(`${BASE_URL}/#/admin/login`, { waitUntil: 'networkidle' });

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard (root admin path)
    try {
      // The dashboard is at /admin, not /admin/dashboard
      await page.waitForURL('**/admin', { timeout: 10000 });
      console.log('✅ Login successful, redirected to Dashboard (/admin).');
    } catch (e) {
      console.error('❌ Failed to redirect to Dashboard after login.');
      // Check for error message
      const errorMsg = await page
        .locator('.text-red-500')
        .textContent()
        .catch(() => null);
      if (errorMsg) console.error(`   Error message: ${errorMsg}`);
      await page.screenshot({ path: path.join(resultsDir, 'login-failed.png') });
      throw e;
    }

    // 6. Verify Dashboard Content (New Component Check)
    console.log(`\n📊 Verifying Dashboard Content...`);
    // Wait for stats to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for charts animation

    // Check for Stat Cards (Should be 4: Projects, Donations, Volunteers, News)
    // Selector update: shadow-sm instead of shadow-md
    const statCards = await page.locator('.bg-white.p-6.rounded-lg.shadow-sm').count();
    if (statCards >= 4) {
      console.log(`✅ Found ${statCards} stat cards on Dashboard.`);
    } else {
      console.warn(`⚠️ Only found ${statCards} stat cards. Expected at least 4.`);
    }

    // Check for Charts (Recharts responsive container)
    const charts = await page.locator('.recharts-responsive-container').count();
    if (charts > 0) {
      console.log(`✅ Found ${charts} charts on Dashboard.`);
    } else {
      console.warn(`⚠️ No charts found on Dashboard. Check if data is loaded.`);
    }

    // Screenshot Dashboard
    await page.screenshot({ path: path.join(resultsDir, 'dashboard-success.png') });
    console.log(`📸 Dashboard screenshot saved to test-results/dashboard-success.png`);
  } catch (error) {
    console.error('\n❌ Regression Test Failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('\n🏁 Regression Test Completed.');
  }
}

runRegressionTest();
