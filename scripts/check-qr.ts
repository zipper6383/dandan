import { chromium } from 'playwright';

async function checkPaymentQR() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to About page...');
    await page.goto('http://localhost:3000/#/about', { waitUntil: 'networkidle' });

    console.log('Clicking Donation Method tab...');
    // The text might be "捐赠方式"
    await page.click('button:has-text("捐赠方式")');

    const qrSelector = 'img[alt="电子支付"]';
    await page.waitForSelector(qrSelector, { timeout: 5000 });
    const src = await page.getAttribute(qrSelector, 'src');

    console.log('QR Image Src:', src);

    if (src === '/images/unified-qr.png') {
      console.log('SUCCESS: Payment QR is correct.');
    } else {
      console.log('FAILURE: Payment QR is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkPaymentQR();
