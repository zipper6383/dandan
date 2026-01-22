import { chromium } from 'playwright';

async function runAdminLoginTest() {
  console.log('🚀 Starting Playwright Admin Login Test (Diagnostic Mode)...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // --- DIAGNOSTICS ---
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning')
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('response', async (response) => {
    if (response.url().includes('/api/auth/login')) {
      console.log(`[API RESPONSE] ${response.status()} ${response.url()}`);
      try {
        const body = await response.json();
        console.log('[API BODY]', body);
      } catch (e) {
        console.log('[API BODY] Could not parse JSON');
      }
    }
  });
  // -------------------

  try {
    const loginUrl = 'http://localhost:3000/#/admin/login';
    console.log(`🌐 Navigating to ${loginUrl} ...`);
    await page.goto(loginUrl, { timeout: 30000, waitUntil: 'domcontentloaded' });

    console.log('✍️  Filling credentials...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');

    console.log('🖱️  Clicking Login button...');
    await page.click('button[type="submit"]');

    console.log('⏳ Waiting for navigation...');
    // Increase timeout
    await page.waitForURL((url) => url.hash.includes('/admin') && !url.hash.includes('/login'), {
      timeout: 10000,
    });

    console.log('✅ Admin Login Successful!');
    await page.screenshot({ path: 'admin-login-success.png' });
  } catch (error) {
    console.error('❌ Test Failed:', error);
    await page.screenshot({ path: 'admin-login-error.png' });
  } finally {
    await browser.close();
    console.log('👋 Browser closed.');
  }
}

runAdminLoginTest();
