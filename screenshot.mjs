import puppeteer from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { readdirSync } from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3003';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const dir = './temporary screenshots';

if (!existsSync(dir)) mkdirSync(dir);

const existing = readdirSync(dir).filter(f => f.endsWith('.jpg'));
const n = existing.length + 1;
const file = path.join(dir, `screenshot-${n}${label}.jpg`);

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 90 });
await browser.close();
console.log(`Saved: ${file}`);
