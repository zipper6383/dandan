import { chromium } from 'playwright';

async function testWebInterface() {
  console.log('🚀 Starting Web Interface Test...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test Homepage
    console.log('📱 Testing Homepage...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/homepage-test.png' });
    
    // Check main elements
    const title = await page.title();
    console.log(`✅ Page Title: ${title}`);
    
    const header = await page.locator('header').isVisible();
    console.log(`✅ Header Visible: ${header}`);
    
    const footer = await page.locator('footer').isVisible();
    console.log(`✅ Footer Visible: ${footer}`);
    
    // Test Navigation
    console.log('🧭 Testing Navigation...');
    await page.click('text=慈善项目');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/projects-page.png' });
    
    // Test Admin Login
    console.log('🔐 Testing Admin Login...');
    await page.goto('http://localhost:3000/#/admin/login');
    await page.waitForLoadState('networkidle');
    
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/admin-dashboard.png' });
    
    console.log('✅ Web Interface Test Completed Successfully!');
    
  } catch (error) {
    console.error('❌ Test Failed:', error);
    await page.screenshot({ path: 'test-results/error-screenshot.png' });
  } finally {
    await browser.close();
  }
}

// Run the test
testWebInterface().catch(console.error);