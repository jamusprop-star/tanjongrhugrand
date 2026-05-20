import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
page.on('console', m => console.log('CONSOLE:', m.type(), m.text()));
page.on('pageerror', e => console.log('ERROR:', e.message));
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });

const btn = await page.$('#open-brochure-lb');
console.log('Button found:', !!btn);

if (btn) {
  await btn.click();
  await new Promise(r => setTimeout(r, 400));
  const cls = await page.evaluate(() => document.getElementById('brochure-lightbox').className);
  console.log('Lightbox classes after click:', cls);
}

await browser.close();
