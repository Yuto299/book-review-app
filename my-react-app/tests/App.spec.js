import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('button', { name: 'Login' }).click(); //ログインボタンをクリック
  await expect(page.locator('text=Email is required')).toBeVisible();
  await expect(page.locator('text=Password is required')).toBeVisible();

  await page.locator('input[type="email"]').fill('test@example.com');
  await page.locator('input[type="password"]').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('text=Email is required')).toBeHidden();
  await expect(page.locator('text=Password is required')).toBeHidden();
});
