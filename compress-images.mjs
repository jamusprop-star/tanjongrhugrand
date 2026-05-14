import sharp from 'sharp';
import { readdir } from 'fs/promises';

const photosDir = './Photos';
const quality = 85;
const maxWidth = 1920;

async function compressImages() {
  const files = await readdir(photosDir);

  // Compress TRHero JPG files
  const trHeroFiles = files.filter(f => f.startsWith('TRHero') && f.endsWith('.jpg'));

  for (const file of trHeroFiles) {
    const inputPath = `${photosDir}/${file}`;
    const outputPath = `${photosDir}/${file.replace('.jpg', '-compressed.webp')}`;

    console.log(`Compressing ${file}...`);
    await sharp(inputPath)
      .resize(maxWidth, null, { withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    console.log(`✓ Saved ${outputPath}`);
  }

  // Compress TRLogoWhite PNG
  const logoFile = 'TRLogoWhite.png';
  if (files.includes(logoFile)) {
    const inputPath = `${photosDir}/${logoFile}`;
    const outputPath = `${photosDir}/TRLogoWhite-compressed.webp`;

    console.log(`Compressing ${logoFile}...`);
    await sharp(inputPath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath);

    console.log(`✓ Saved ${outputPath}`);
  }

  console.log('All images compressed!');
}

compressImages().catch(console.error);
