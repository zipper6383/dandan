import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');
const newsImagesDir = path.join(imagesDir, 'news');

// Ensure news directory exists
if (!fs.existsSync(newsImagesDir)) {
  console.log(`Creating directory: ${newsImagesDir}`);
  fs.mkdirSync(newsImagesDir, { recursive: true });
}

// Source image to use as placeholder (using longgang-banner.png as it is relevant)
const sourceImage = path.join(imagesDir, 'longgang-banner.png');
const secondarySource = path.join(imagesDir, 'header_bg.png');

if (!fs.existsSync(sourceImage)) {
  console.error('Source image longgang-banner.png not found!');
  process.exit(1);
}

// List of missing files based on DB check
const filesToCreate = [
  'media-1.jpg',
  'media-2.jpg',
  'media-3.jpg',
  'media-4.jpg',
  'media-5.jpg',
  'district-1.jpg',
  'district-2.jpg',
  'district-4.jpg',
  'district-5.jpg',
  'charity-1.jpg',
  'charity-2.jpg',
  'charity-3.jpg',
  'charity-4.jpg',
  'charity-5.jpg',
];

filesToCreate.forEach((file, index) => {
  const destPath = path.join(newsImagesDir, file);
  if (!fs.existsSync(destPath)) {
    // Alternate between source images for variety
    const src = index % 2 === 0 ? sourceImage : secondarySource;
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPath);
      console.log(`Created placeholder: ${destPath}`);
    }
  } else {
    console.log(`File already exists: ${destPath}`);
  }
});

// Remove old Chang'an image
const changanImage = path.join(imagesDir, 'changan.png');
if (fs.existsSync(changanImage)) {
  fs.unlinkSync(changanImage);
  console.log(`Deleted old image: ${changanImage}`);
} else {
  console.log(`Old image not found (already deleted): ${changanImage}`);
}

console.log('Image fix completed.');
