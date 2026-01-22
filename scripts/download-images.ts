import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_TO_DOWNLOAD = [
  {
    url: 'http://img.mp.sohu.com/upload/20170524/64fe6b6dc9f84c44a195e86b9016406d_th.png',
    path: '../public/images/news/charity-5.jpg' // Summer/City Builders
  },
  {
    url: 'https://www.tasedu.com.cn/Public/Home/images/xinwen-banner.jpg',
    path: '../public/images/news/charity-3.jpg' // Bazaar
  },
  {
    url: 'https://hz.hngh.org/file/cms/202412/d383c121f5b64754abdca95f82ed70c2.png',
    path: '../public/images/news/media-3.jpg' // Banner/Yangcheng
  },
  {
    url: 'https://pic.crcf.org.cn/RedCrossFoundation/upload/2025-09-08/2c91b79a97f8d7e3980019926e206033b43.png',
    path: '../public/images/news/media-1.jpg' // Anniversary
  },
  {
    // Use the same summer image for district-1 (City Builders) or a similar one
    url: 'http://img.mp.sohu.com/upload/20170524/64fe6b6dc9f84c44a195e86b9016406d_th.png',
    path: '../public/images/news/district-1.jpg'
  }
];

function downloadFile(url: string, destPath: string) {
  return new Promise<void>((resolve, reject) => {
    const fullPath = path.resolve(__dirname, destPath);
    const file = fs.createWriteStream(fullPath);
    const protocol = url.startsWith('https') ? https : http;

    console.log(`Downloading ${url} to ${destPath}...`);

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const item of IMAGES_TO_DOWNLOAD) {
    try {
      await downloadFile(item.url, item.path);
    } catch (err) {
      console.error(`❌ Error downloading ${item.path}:`, err);
    }
  }
}

main();
