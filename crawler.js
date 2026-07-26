const { chromium } = require('@playwright/test');
const fs = require('fs');

async function crawl() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:5001');
    const links = await page.locator('a').all();
    const routes = new Set();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && (href.startsWith('/') || href.startsWith('http://localhost:5001'))) {
        const url = new URL(href, 'http://localhost:5001').pathname;
        routes.add(url);
      }
    }
    console.log(JSON.stringify([...routes]));
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
}

crawl();
