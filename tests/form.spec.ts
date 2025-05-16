import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import formData from '../fixtures/formData.json';
import { generateRandomName } from '../utils/helper.ts';

test.use({
  viewport: { width: 375, height: 812 },
});
test('Smoke test: fill form without submitting', async ({ page }) => {
  const homePage = new HomePage(page);
  const { firstName, lastName } = generateRandomName();

  await page.goto('https://trajectormedical.com');
  await expect(page).toHaveURL(/trajectormedical\.com/);

  await homePage.clickGetStarted();

  await homePage.fillForm({
    ...formData,
    firstName,
    lastName,
  });

  await page.screenshot({ path: 'form-filled.png' });
});