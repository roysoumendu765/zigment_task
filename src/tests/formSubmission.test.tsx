import { test, expect } from '@playwright/test';

test.describe('Real-time Form Generation', () => {
  test('should generate a form based on JSON input', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const rawInputArea = await page.locator('textarea');
    const submitButton = await page.locator('button[type="submit"]');
    const formPreview = await page.locator('form');

    await rawInputArea.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text", "label": "Full Name"}]}');
    await page.keyboard.press('Enter');

    await expect(formPreview).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});
