import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'node:fs';

// Read SVG and strip UTF-8 BOM so parsers treat it as valid SVG
let svg = readFileSync('public/favicon.svg', 'utf8');
if (svg.charCodeAt(0) === 0xFEFF) svg = svg.slice(1);
writeFileSync('public/favicon.svg', svg, 'utf8'); // re-save without BOM
const svgBuf = Buffer.from(svg);

const sizes = [16, 32, 48, 180, 192, 512];
for (const s of sizes) {
  const out = s === 180 ? 'public/apple-touch-icon.png'
            : s === 192 ? 'public/favicon-192.png'
            : s === 512 ? 'public/favicon-512.png'
            : `public/favicon-${s}.png`;
  await sharp(svgBuf, { density: 384 })
    .resize(s, s, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(out);
  console.log('wrote', out);
}

// favicon.ico (16/32/48 multi-res)
const ico = await pngToIco(['public/favicon-16.png', 'public/favicon-32.png', 'public/favicon-48.png']);
writeFileSync('public/favicon.ico', ico);
console.log('wrote public/favicon.ico');
