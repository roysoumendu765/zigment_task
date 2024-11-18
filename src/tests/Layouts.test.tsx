import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('should display left and right sections correctly on mobile', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.setViewportSize({ width: 375, height: 667 });

    const leftSide = await page.locator('.w-full.md\\:w-1\\/2.p-4.border-b.md\\:border-b-0');
    const rightSide = await page.locator('.w-full.md\\:w-1\\/2.p-4.dark\\:bg-gray-0');

    await expect(leftSide).toBeVisible();
    await expect(rightSide).toBeVisible();

    const layoutStyle = await page.locator('.flex-col.md\\:flex-row').evaluate(el => window.getComputedStyle(el).getPropertyValue('flex-direction'));
    expect(layoutStyle).toBe('column');
  });

  test('should display sections side by side on desktop', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.setViewportSize({ width: 1024, height: 768 });

    const leftSide = await page.locator('.w-full.md\\:w-1\\/2.p-4.border-b.md\\:border-b-0');
    const rightSide = await page.locator('.w-full.md\\:w-1\\/2.p-4.dark\\:bg-gray-0');

    await expect(leftSide).toBeVisible();
    await expect(rightSide).toBeVisible();

    const layoutStyle = await page.locator('.flex-col.md\\:flex-row').evaluate(el => window.getComputedStyle(el).getPropertyValue('flex-direction'));
    expect(layoutStyle).toBe('row');
  });
});


