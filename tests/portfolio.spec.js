import { test, expect } from '@playwright/test';

test('gallery artwork loads, filters correctly, and opens a project', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.work-item')).toHaveCount(6);
  for (const image of await page.locator('.work-image img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await page.getByRole('button', { name: 'Editorial', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Editorial', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.work-caption')).toContainText(['Editorial', 'Editorial']);
  await page.getByRole('button', { name: 'Personal', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(3);
  await page.getByRole('button', { name: 'Collaborations', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(1);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(6);
  await page.getByRole('link', { name: 'View Slow afternoons' }).click();
  await expect(page).toHaveURL('/work/slow-afternoons');
  await expect(page.locator('h1')).toHaveText('Slow afternoons.');
  await expect(page.locator('.project-cover img')).toBeVisible();
  await page.locator('.next-project').click();
  await expect(page).toHaveURL('/work/a-place-to-be');
  await expect(page).toHaveTitle('A place to be — Alma Ríos');
  await page.reload();
  await expect(page.locator('h1')).toHaveText('A place to be.');
  await expect(errors).toEqual([]);
});

test('all project routes, about, contact and unknown paths work', async ({ page }) => {
  const slugs = ['slow-afternoons', 'a-place-to-be', 'in-full-bloom', 'moonlit-garden', 'the-shape-of-home', 'together-we-grow'];
  for (const slug of slugs) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.project-cover img')).toBeVisible();
    await expect.poll(() => page.locator('.project-cover img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL('/about');
  await expect(page.getByRole('heading', { name: 'Hello, I’m Alma.' })).toBeVisible();
  await page.getByRole('link', { name: 'Let’s talk' }).click();
  await expect(page).toHaveURL('/#contact');
  await expect(page.locator('.email-link')).toBeInViewport();
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:hello@almarios.studio');
  await expect(page.locator('.instagram-link')).toHaveAttribute('rel', 'noreferrer');
  await page.goto('/work/does-not-exist');
  await expect(page.getByRole('heading', { name: 'Nothing growing here. Yet.' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to the gallery' }).click();
  await expect(page).toHaveURL('/');
});

test('mobile and tablet layouts preserve image ratios without horizontal overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/about', '/work/slow-afternoons', '/work/a-place-to-be']) {
      await page.goto(route);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'View Slow afternoons' }).click();
  await expect(page.locator('h1')).toHaveText('Slow afternoons.');
  await page.getByRole('link', { name: 'All work', exact: true }).click();
  await expect(page).toHaveURL('/#selected-work');
  await expect(page.locator('#work-heading')).toBeInViewport();
});
