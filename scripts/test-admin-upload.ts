import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:5000/api';
// Assuming uploads are in project root/uploads
const UPLOAD_DIR = path.join(__dirname, '../uploads');

async function runTest() {
  try {
    console.log('--- Starting Admin Upload Test ---');

    // 1. Login with 'admin' / 'admin'
    console.log('Logging in with admin/admin...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' }),
    });

    if (!loginRes.ok) {
      const err = await loginRes.text();
      throw new Error(`Login failed: ${loginRes.status} ${err}`);
    }

    const loginData = (await loginRes.json()) as { token: string };
    const token = loginData.token;
    console.log('✅ Login successful, token received.');

    // 2. Create Dummy Image
    const testImagePath = path.join(__dirname, 'test-image.png');
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, 'fake image content');
    }

    // 3. Upload Image
    console.log('Uploading image...');
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testImagePath));

    const uploadRes = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Upload failed: ${uploadRes.status} ${errText}`);
    }

    const uploadData = (await uploadRes.json()) as { url: string };
    console.log('✅ Upload successful. Response:', uploadData);

    // 4. Verify File on Disk
    const fileUrl = uploadData.url;
    const filename = fileUrl.split('/').pop();
    const uploadedFilePath = path.join(UPLOAD_DIR, filename);

    if (fs.existsSync(uploadedFilePath)) {
      console.log(`✅ File exists on disk: ${uploadedFilePath}`);
    } else {
      throw new Error(`❌ File NOT found on disk: ${uploadedFilePath}`);
    }

    // 5. Verify File Access via URL
    console.log(`Verifying URL access: ${fileUrl}`);
    const fileRes = await fetch(fileUrl);
    if (fileRes.ok) {
      console.log('✅ File is accessible via URL.');
    } else {
      throw new Error(`❌ File URL access failed: ${fileRes.status}`);
    }

    // Cleanup local test file
    fs.unlinkSync(testImagePath);
    console.log('🧹 Cleaned up local test file.');
  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exit(1);
  }
}

runTest();
