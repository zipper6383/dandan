import { chromium } from 'playwright';

async function testFeatures() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🧪 Starting Feature Tests...\n');

  try {
    // Test 1: Home Page
    console.log('✅ Test 1: Home Page Loading');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    console.log(`   Page Title: ${title}`);

    // Check for dynamic news tabs
    const newsTabs = await page.locator('button:has-text("慈善资讯")').count();
    console.log(`   News Tabs Found: ${newsTabs > 0 ? '✓' : '✗'}`);

    // Test 2: Search Functionality
    console.log('\n✅ Test 2: Search Page');
    await page.goto('http://localhost:3000/#/search?q=助学');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const searchResults = await page.locator('.space-y-6 > div').count();
    console.log(`   Search Results Found: ${searchResults}`);

    // Test 3: Fund Detail Page
    console.log('\n✅ Test 3: Fund Detail Page');
    await page.goto('http://localhost:3000/#/funds/1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const fundTitle = await page
      .locator('h1')
      .filter({ hasText: /西安慈善微基金|基金/ })
      .count();
    console.log(`   Fund Title Found: ${fundTitle > 0 ? '✓' : '✗'}`);

    // Check for share buttons
    const shareButtons = await page.locator('text=分享到：').count();
    console.log(`   Share Section: ${shareButtons > 0 ? '✓' : '✗'}`);

    // Test 4: User Profile Page
    console.log('\n✅ Test 4: User Profile Page');
    await page.goto('http://localhost:3000/#/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const profileContent = await page.locator('h2:has-text("请先登录")').count();
    console.log(`   Login Required: ${profileContent > 0 ? '✓' : '✗'}`);

    // Test 5: Donation History
    console.log('\n✅ Test 5: Donation History Page');
    await page.goto('http://localhost:3000/#/profile/donations');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const donationPage = await page
      .locator('h2:has-text("请先登录"), h1:has-text("我的捐赠")')
      .count();
    console.log(`   Page Loaded: ${donationPage > 0 ? '✓' : '✗'}`);

    // Test 6: Info Pages
    console.log('\n✅ Test 6: Financial Reports Page');
    await page.goto('http://localhost:3000/#/info/financial');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const financialTitle = await page.locator('h1').filter({ hasText: '财务报告' }).count();
    console.log(`   Financial Reports: ${financialTitle > 0 ? '✓' : '✗'}`);

    console.log('\n✅ Test 7: Annual Reports Page');
    await page.goto('http://localhost:3000/#/info/annual');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const annualTitle = await page.locator('h1').filter({ hasText: '年度报告' }).count();
    console.log(`   Annual Reports: ${annualTitle > 0 ? '✓' : '✗'}`);

    console.log('\n✅ Test 8: Download Center Page');
    await page.goto('http://localhost:3000/#/info/download');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const downloadTitle = await page.locator('h1').filter({ hasText: '资料下载' }).count();
    console.log(`   Download Center: ${downloadTitle > 0 ? '✓' : '✗'}`);

    // Test 9: Admin Login
    console.log('\n✅ Test 9: Admin Login');
    await page.goto('http://localhost:3000/#/admin/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    const adminUrl = page.url();
    console.log(`   Admin Login: ${adminUrl.includes('/admin') ? '✓' : '✗'}`);

    // Test 10: Admin Dashboard with Charts
    console.log('\n✅ Test 10: Admin Dashboard');
    await page.goto('http://localhost:3000/#/admin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    const dashboardTitle = await page.locator('h1:has-text("数据仪表盘")').count();
    console.log(`   Dashboard Loaded: ${dashboardTitle > 0 ? '✓' : '✗'}`);

    // Check for charts
    const charts = await page.locator('.recharts-wrapper').count();
    console.log(`   Charts Found: ${charts}`);

    // Test 11: About Content Editor
    console.log('\n✅ Test 11: About Content Editor');
    await page.goto('http://localhost:3000/#/admin/about-content');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const editorTitle = await page.locator('h1:has-text("关于我们")').count();
    console.log(`   Editor Loaded: ${editorTitle > 0 ? '✓' : '✗'}`);

    // Check for Quill editor
    const quillEditor = await page.locator('.ql-editor').count();
    console.log(`   Rich Text Editor: ${quillEditor > 0 ? '✓' : '✗'}`);

    // Test 12: Category Manager
    console.log('\n✅ Test 12: Category Manager');
    await page.goto('http://localhost:3000/#/admin/categories');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const categoryTitle = await page.locator('h1').filter({ hasText: '分类管理' }).count();
    console.log(`   Category Manager: ${categoryTitle > 0 ? '✓' : '✗'}`);

    // Test 13: Fund Manager
    console.log('\n✅ Test 13: Fund Manager');
    await page.goto('http://localhost:3000/#/admin/funds');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const fundManager = await page.locator('h1').filter({ hasText: '公益基金管理' }).count();
    console.log(`   Fund Manager: ${fundManager > 0 ? '✓' : '✗'}`);

    console.log('\n🎉 All Tests Completed!\n');
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  } finally {
    await browser.close();
  }
}

testFeatures();
