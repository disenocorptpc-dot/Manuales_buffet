// optimize-from-tmp.mjs — reads from TEMP dir, writes optimized back to project
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import os from 'os';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const TMP_DIR    = join(os.tmpdir(), 'buffet_opt');
const HERO_OUT   = join(__dirname, 'public/assets/img');
const BG_OUT     = join(__dirname, 'public/_recursos/imagenes');

// Map filename → destination directory
const BG_FILES = new Set(['B1.webp', 'B2.webp']);

const sizeOf = async p => (await stat(p)).size;
const toKB   = b => (b / 1024).toFixed(0).padStart(5);

async function main() {
  console.log('🖼  Palace Buffet — Image Optimizer (from temp)\n');
  const files = await readdir(TMP_DIR);

  let totalBefore = 0, totalAfter = 0;

  for (const f of files) {
    const src = join(TMP_DIR, f);
    const ext = extname(f).toLowerCase();
    if (!['.webp','.jpg','.jpeg','.png'].includes(ext)) continue;

    const isBg  = BG_FILES.has(f);
    const outDir = isBg ? BG_OUT : HERO_OUT;
    const dest   = join(outDir, f);  // always keep same filename

    const before = await sizeOf(src);
    totalBefore += before;

    try {
      if (isBg) {
        // Background: large slide image
        await sharp(src)
          .resize(1920, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(dest);
      } else {
        // Hero: circle image
        await sharp(src)
          .resize(900, 900, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(dest);
      }

      const after = await sizeOf(dest);
      totalAfter += after;
      const pct  = Math.round((1 - after / before) * 100);
      console.log(`  ${f.padEnd(46)} ${toKB(before)} KB → ${toKB(after)} KB  (-${pct}%)`);
    } catch (e) {
      console.error(`  ✗ ${f}: ${e.message}`);
    }
  }

  const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
  console.log(`\n${'─'.repeat(70)}`);
  console.log(`  TOTAL  ${toKB(totalBefore)} KB → ${toKB(totalAfter)} KB  (-${totalPct}%)`);
  console.log(`         ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB`);
  console.log('\n✅  Done! Run: npx vite build\n');
}

main().catch(e => { console.error(e); process.exit(1); });
