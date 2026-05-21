import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const sourceDir = './TRGPhotos';
const files = await readdir(sourceDir);

for (const file of files) {
  if (file.match(/\.(png|jpg|jpeg)$/i)) {
    const input = join(sourceDir, file);
    const output = join(sourceDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

    await sharp(input)
      .webp({ quality: 85 })
      .toFile(output);

    console.log(`Converted ${file} → ${file.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`);
  }
}
