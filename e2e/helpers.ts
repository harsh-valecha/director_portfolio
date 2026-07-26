import { expect, Page } from '@playwright/test';

export async function checkPageHealth(page: Page) {
  // Check for console errors
  const logs: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') logs.push(msg.text());
  });
  
  // Check for network failures
  page.on('requestfailed', request => {
    logs.push(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
  });

  // Check title
  const title = await page.title();
  expect(title).not.toBe('');

  // Check media assets (images/videos) load (2xx)
  const images = await page.locator('img').all();
  for (const img of images) {
    const src = await img.getAttribute('src');
    if (src) {
      const response = await page.request.get(src);
      expect(response.status(), `Image ${src} failed to load`).toBeGreaterThanOrEqual(200);
      expect(response.status(), `Image ${src} failed to load`).toBeLessThan(400);
    }
  }

  return logs;
}

export async function checkLinks(page: Page) {
  const links = await page.locator('a').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      const response = await page.request.get(href);
      expect(response.status(), `Link ${href} failed`).toBeGreaterThanOrEqual(200);
      expect(response.status(), `Link ${href} failed`).toBeLessThan(400);
    }
  }
}

export async function testForm(page: Page, formSelector: string, validData: any, invalidData: any) {
  // Valid Submit
  await page.fill(formSelector + ' input', validData.email); // Simple assumption for contact form
  await page.fill(formSelector + ' textarea', validData.message);
  await page.click(formSelector + ' button');
  const successMsg = page.locator('.success-message'); // Common pattern
  await expect(successMsg).toBeVisible();

  // Invalid Submit
  await page.fill(formSelector + ' input', invalidData.email);
  await page.click(formSelector + ' button');
  const errorMsg = page.locator('.error-message'); 
  await expect(errorMsg).toBeVisible();
}
