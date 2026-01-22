import { chromium } from 'playwright';
import path from 'path';

async function testAdminImageUpload() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/#/admin/login', { waitUntil: 'domcontentloaded' });
    console.log('Page loaded. URL:', page.url());

    // Take a screenshot to debug
    await page.screenshot({ path: 'login-page.png' });

    console.log('Logging in...');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');

    // Wait for navigation away from login
    await page
      .waitForURL((url) => !url.href.includes('login'), { timeout: 10000 })
      .catch(() => console.log('Still on login page?'));
    console.log('Current URL after login:', page.url());

    if (page.url().includes('login')) {
      console.log('Login failed. Page content:', await page.textContent('body'));
      throw new Error('Login failed');
    }

    console.log('Navigating to Project Manager...');
    await page.goto('http://localhost:3000/#/admin/projects');
    console.log('Project Manager URL:', page.url());

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    console.log('Checking if we are on login page again...');
    if (page.url().includes('login')) {
      console.log('Redirected to login. Auth token might be missing.');
      throw new Error('Redirected to login');
    }

    console.log('Opening "Publish New Project" modal...');

    console.log('Opening "Publish New Project" modal...');
    // Look for the button with text "发布新项目" or icon
    await page.click('button:has-text("发布新项目")');

    console.log('Uploading image...');
    // The ImageUpload component has an input[type="file"]
    // We need to find the file input within the modal
    const fileInput = page.locator('input[type="file"]');

    // Path to a test image
    const imagePath = path.resolve(process.cwd(), 'public/images/longgang-banner.png');
    console.log('Using image:', imagePath);

    await fileInput.setInputFiles(imagePath);

    console.log('Waiting for upload to complete...');
    // Wait for the preview image to appear.
    // The ImageUpload component renders an <img> tag with alt="Preview" when there is a value.
    try {
      await page.waitForSelector('img[alt="Preview"]', { timeout: 10000 });
      console.log('Image upload successful! Preview displayed.');
    } catch (e) {
      console.log('Preview not found. Checking for errors...');
      const errorMsg = await page.textContent('.text-red-500');
      if (errorMsg) {
        console.error('Upload failed with error:', errorMsg);
        throw new Error(`Upload failed: ${errorMsg}`);
      } else {
        throw e;
      }
    }

    // Optionally submit the form to verify full flow, but upload verification is the key here.
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAdminImageUpload();
