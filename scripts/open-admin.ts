import { chromium } from 'playwright';

async function openAdmin() {
  console.log('🚀 Launching browser to login as Admin...');
  // Launch in headed mode so user can see
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const BASE_URL = 'http://localhost:3000';

  try {
    console.log(`\n📄 Navigating to Login Page: ${BASE_URL}/#/admin/login`);
    await page.goto(`${BASE_URL}/#/admin/login`, { waitUntil: 'networkidle' });

    console.log('🔐 Filling credentials...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');
    
    console.log('👆 Clicking Login...');
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL('**/admin', { timeout: 10000 });
    console.log('✅ Login successful! Browser will remain open.');

    // Keep the script running so browser stays open
    // In a real scenario, we might want to detach or just wait indefinitely
    await new Promise(() => {}); 

  } catch (error) {
    console.error('❌ Login failed:', error);
    await browser.close();
  }
}

openAdmin();
