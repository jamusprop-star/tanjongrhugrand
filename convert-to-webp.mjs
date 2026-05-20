import sharp from 'sharp';
import { readdir } from 'fs/promises';

const photosDir = './Photos';
const quality = 85;

async function convertToWebP() {
  const files = await readdir(photosDir);

  // Target the large compressed JPG files
  const targetFiles = files.filter(f =>
    f.endsWith('-compressed.jpg') ||
    (f.endsWith('.jpg') && !f.includes('-compressed'))
  );

  for (const file of targetFiles) {
    const inputPath = `${photosDir}/${file}`;
    const outputPath = `${photosDir}/${file.replace('.jpg', '.webp')}`;

    console.log(`Converting ${file} to WebP...`);

    try {
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(outputPath);

      const stats = await sharp(inputPath).metadata();
      const webpStats = await sharp(outputPath).metadata();
      const savings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

      console.log(`✓ Saved ${outputPath} (${savings}% smaller)`);
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err.message);
    }
  }

  console.log('\nAll images converted to WebP!');
}

convertToWebP().catch(console.error);
