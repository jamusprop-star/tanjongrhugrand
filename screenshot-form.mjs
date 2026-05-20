import puppeteer from 'puppeteer';
import path from 'path';

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// scroll to bottom to trigger lazy loads
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 500));

const section = await page.$('#enquiry');
if (!section) {
  console.log('Section not found, available sections:');
  const ids = await page.evaluate(() => [...document.querySelectorAll('section')].map(s => s.id || s.className));
  console.log(ids);
} else {
  const clip = await section.boundingBox();
  const file = path.join('./temporary screenshots', 'screenshot-25-form-crop.jpg');
  await page.screenshot({ path: file, clip, type: 'jpeg', quality: 90 });
  console.log('Saved:', file);
}
await browser.close();
