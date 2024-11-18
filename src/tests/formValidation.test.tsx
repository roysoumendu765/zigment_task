import { test, expect } from '@playwright/test';

test.describe('Form Validation and Submission', () => {
  test('should show validation error for required fields', async ({ page }) => {
    await page.goto('http://localhost:3000'); // Adjust based on your app's URL

    const rawInputArea = await page.locator('textarea');
    const submitButton = await page.locator('button[type="submit"]');
    const formPreview = await page.locator('form');

    // Valid JSON to trigger form generation
    await rawInputArea.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text", "label": "Full Name", "required": true}]}');
    await page.keyboard.press('Enter');

    // Wait for the form to be generated
    await expect(formPreview).toBeVisible();
    await expect(submitButton).toBeEnabled();

    // Try to submit without filling the required field
    await submitButton.click();

    const errorMessage = await page.locator('p.text-red-500');
    await expect(errorMessage).toHaveText('Full Name is required');
  });

  test('should submit form data successfully', async ({ page }) => {
    await page.goto('http://localhost:3000'); 

    const rawInputArea = await page.locator('textarea');
    const submitButton = await page.locator('button[type="submit"]');

    await rawInputArea.fill('{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text", "label": "Full Name", "required": true}]}');
    await page.keyboard.press('Enter');

    const nameInput = await page.locator('input#name');
    await nameInput.fill('John Doe');
    await submitButton.click();

    const successAlert = await page.locator('.swal2-success');
    await expect(successAlert).toBeVisible();
  });
});
