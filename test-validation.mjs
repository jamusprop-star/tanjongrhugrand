import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
page.on('console', m => console.log('CONSOLE:', m.type(), m.text()));
page.on('dialog', async dialog => {
    console.log('ALERT:', dialog.message());
    await dialog.dismiss();
});

await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });

console.log('\n=== Testing Main Form Validation ===\n');

// Scroll to form
await page.evaluate(() => {
    document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' });
});
await new Promise(r => setTimeout(r, 500));

// Test 1: Try to submit with empty phone (should fail HTML5 validation)
console.log('Test 1: Empty phone field');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="phone"]').value = '';
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 300));

// Test 2: Invalid phone number (7 digits)
console.log('Test 2: Invalid phone (7 digits)');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="phone"]').value = '1234567';
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 300));

// Test 3: Invalid phone (starts with 6)
console.log('Test 3: Invalid phone (starts with 6)');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="phone"]').value = '61234567';
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 300));

// Test 4: Valid phone, but uncheck all interests
console.log('Test 4: No interest selected');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="phone"]').value = '81234567';
    form.querySelectorAll('input[name^="interest-"]').forEach(cb => cb.checked = false);
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

// Test 5: Check one interest, but uncheck all unit types
console.log('Test 5: No unit type selected');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="interest-brochure"]').checked = true;
    form.querySelectorAll('input[name^="unit-"]').forEach(cb => cb.checked = false);
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

// Test 6: Check unit type, but uncheck consent
console.log('Test 6: Consent not checked');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="unit-1br"]').checked = true;
    form.querySelector('input[name="consent"]').checked = false;
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

// Test 7: Valid submission
console.log('Test 7: Valid submission');
await page.evaluate(() => {
    const form = document.getElementById('enquiry-form');
    form.querySelector('input[name="name"]').value = 'John Doe';
    form.querySelector('input[name="email"]').value = 'john@example.com';
    form.querySelector('input[name="phone"]').value = '91234567';
    form.querySelector('input[name="interest-brochure"]').checked = true;
    form.querySelector('input[name="unit-2br"]').checked = true;
    form.querySelector('input[name="consent"]').checked = true;
});
await page.click('#enquiry-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

console.log('\n=== Testing Lightbox Form Validation ===\n');

// Open lightbox
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));
await page.click('#open-brochure-lb');
await new Promise(r => setTimeout(r, 400));

// Test 8: Lightbox form - uncheck all interests
console.log('Test 8: Lightbox - No interest selected');
await page.evaluate(() => {
    const form = document.getElementById('brochure-form');
    form.querySelector('input[name="name"]').value = 'Jane Doe';
    form.querySelector('input[name="email"]').value = 'jane@example.com';
    form.querySelector('input[name="phone"]').value = '81234567';
    form.querySelectorAll('input[name^="interest-"]').forEach(cb => cb.checked = false);
    form.querySelector('input[name="unit-3br"]').checked = true;
    form.querySelector('input[name="consent"]').checked = true;
});
await page.click('#brochure-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

// Test 9: Lightbox form - valid submission
console.log('Test 9: Lightbox - Valid submission');
await page.evaluate(() => {
    const form = document.getElementById('brochure-form');
    form.querySelector('input[name="interest-pricelist"]').checked = true;
});
await page.click('#brochure-form button[type="submit"]');
await new Promise(r => setTimeout(r, 500));

console.log('\n=== All tests completed ===\n');

await browser.close();
