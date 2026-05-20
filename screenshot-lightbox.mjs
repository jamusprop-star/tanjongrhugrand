import puppeteer from 'puppeteer';
import path from 'path';

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });

// Click the "Download e-Brochure" button to open lightbox
await page.click('#open-brochure-lb');
await new Promise(r => setTimeout(r, 400)); // wait for animation

const file = path.join('./temporary screenshots', 'screenshot-29-lightbox-open.jpg');
await page.screenshot({ path: file, type: 'jpeg', quality: 90 });
console.log('Saved:', file);

await browser.close();
