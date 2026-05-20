import sharp from 'sharp';

const images = [
  'ChencharuPhotos/CGHero1.jpg',
  'ChencharuPhotos/CGHero2.jpg',
  'ChencharuPhotos/CGHero3.jpg',
  'ChencharuPhotos/ChencharuGrandWhite.png',
  'ChencharuPhotos/ChencharuGrandLocation.png',
  'ChencharuPhotos/ChencharuEbook.png'
];

async function convertImages() {
  for (const img of images) {
    const outputPath = img.replace(/\.(jpg|png)$/, '.webp');

    console.log(`Converting ${img}...`);

    try {
      await sharp(img)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      console.log(`✓ Created ${outputPath}`);
    } catch (err) {
      console.error(`✗ Failed to convert ${img}:`, err.message);
    }
  }

  console.log('\nAll Chencharu images converted!');
}

convertImages().catch(console.error);
