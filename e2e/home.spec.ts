import { test, expect } from '@playwright/test';
import { checkPageHealth } from './helpers';

test('Home page should be healthy', async ({ page }) => {
  await page.goto('/');
  const logs = await checkPageHealth(page);
  expect(logs).toHaveLength(0);
});
