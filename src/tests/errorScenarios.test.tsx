import { test, expect } from '@playwright/test';

test.describe('Error Scenarios', () => {
  test('should show error when invalid JSON is entered', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const rawInputArea = await page.locator('textarea');

    await rawInputArea.fill('{"formTitle": "Test Form", "fields": ['); 
    await page.keyboard.press('Enter');

    const errorMessage = await page.locator('.text-red-500');
    await expect(errorMessage).toHaveText('Invalid JSON Format');
  });
});
