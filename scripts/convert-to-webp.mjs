import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const SKIP = ['icon.png']; // keep as PNG for favicon compatibility

const files = await readdir(PUBLIC_DIR);
const targets = files.filter(f => {
  const ext = extname(f).toLowerCase();
  return (ext === '.jpg' || ext === '.jpeg' || ext === '.png') && !SKIP.includes(f);
});

console.log(`Converting ${targets.length} images to WebP...\n`);

for (const file of targets) {
  const input  = join(PUBLIC_DIR, file);
  const output = join(PUBLIC_DIR, basename(file, extname(file)) + '.webp');

  try {
    const info = await sharp(input).webp({ quality: 85 }).toFile(output);
    const original = (await import('fs')).statSync(input).size;
    const saved = Math.round((1 - info.size / original) * 100);
    console.log(`✓ ${file} → ${basename(output)}  (${saved}% smaller)`);
    await unlink(input);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log('\nDone.');
