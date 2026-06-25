import sharp from "sharp";

const width = 1200;
const height = 630;
const tagline = "Teknik ekibinizin eksik halkası.";

const svg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#FFFFFF"/>
  <text x="360" y="180" font-family="Arial, sans-serif" font-size="56" font-weight="600" fill="#12161C">Takt</text>
  <text x="360" y="250" font-family="Arial, sans-serif" font-size="28" fill="#4A5563" letter-spacing="4">MUHENDISLIK DANISMANLIGI</text>
  <text x="360" y="330" font-family="Arial, sans-serif" font-size="64" font-weight="600" fill="#12161C">${tagline}</text>
</svg>`);

const logo = await sharp("public/logo.webp").resize(220, 220).toBuffer();

await sharp(svg)
  .composite([{ input: logo, top: 205, left: 72 }])
  .png()
  .toFile("app/opengraph-image.png");

console.log("opengraph-image.png created");
