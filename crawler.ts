import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function crawl() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5001');
  
  const links = await page.locator('a').all();
  const routes = new Set<string>();
  
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('http://localhost:5001'))) {
      const url = new URL(href, 'http://localhost:5001').pathname;
      routes.add(url);
    }
  }
  
  console.log(JSON.stringify([...routes]));
  await browser.close();
}

crawl().catch(console.error);
