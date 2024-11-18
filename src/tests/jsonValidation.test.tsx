import { test, expect } from '@playwright/test';

test.describe('JSON Validation', () => {
  test('should show error for invalid JSON format', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const rawInputArea = await page.locator('textarea');
    const errorMessage = await page.locator('p.text-red-500');

    await rawInputArea.fill('{"formTitle": "Test Form", "fields": [');
    await page.keyboard.press('Enter');
    
    expect(await errorMessage.innerText()).toBe('Invalid JSON Format');
  });

  test('should accept valid JSON input', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    const rawInputArea = await page.locator('textarea');
    const errorMessage = await page.locator('p.text-red-500');

    await rawInputArea.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text"}]}');
    await page.keyboard.press('Enter');
    
    expect(await errorMessage.count()).toBe(0); 
  });
});
