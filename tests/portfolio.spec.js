import { test, expect } from '@playwright/test';

const slugs = ['slow-afternoons', 'a-place-to-be', 'in-full-bloom', 'moonlit-garden', 'the-shape-of-home', 'together-we-grow'];

async function platformFonts(page, selector) {
  await page.evaluate(() => document.fonts.ready);
  const client = await page.context().newCDPSession(page);
  try {
    await client.send('DOM.enable');
    await client.send('CSS.enable');
    const { root } = await client.send('DOM.getDocument');
    const { nodeId } = await client.send('DOM.querySelector', { nodeId: root.nodeId, selector });
    return (await client.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
  } finally {
    await client.detach();
  }
}

test('requested branding, equal navigation, top categories and blue artwork overlays', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.wordmark')).toHaveAccessibleName('Wanyue Wang');
  await expect(page.locator('.signature-image')).toHaveAttribute('alt', 'Wanyue Wang');
  await expect.poll(() => page.locator('.signature-image').evaluate(img => img.complete && img.naturalWidth === 2388)).toBe(true);
  await expect(page.locator('.signature-image')).toHaveCSS('filter', 'none');
  const fonts = await platformFonts(page, '.nav-link');
  expect(fonts.some(font => font.familyName === 'Trattatello' && font.isCustomFont)).toBe(true);
  await expect(page.locator('.navigation a')).toHaveText(['all works', 'artistic', 'commercial', 'about', 'contact']);
  await expect(page.locator('.header-description')).toHaveCount(0);
  await expect(page.locator('.language-select option')).toHaveText(['English', '中文']);
  await expect(page.getByRole('combobox', { name: 'Language' })).toHaveValue('en');
  await expect(page.locator('.work-filters, .work-layout')).toHaveCount(0);
  await expect(page.locator('.work-item')).toHaveCount(6);
  await expect(page.locator('.hero, .work-caption, .gallery-note, .work-end, .wordmark-dot')).toHaveCount(0);
  await expect(page.locator('.site-header svg')).toHaveCount(0);
  const styles = await page.locator('.navigation a').evaluateAll(links => links.map(link => ({ size: getComputedStyle(link).fontSize, weight: getComputedStyle(link).fontWeight })));
  expect(new Set(styles.map(style => style.size)).size).toBe(1);
  expect(styles.every(style => Number(style.weight) >= 600)).toBe(true);
  const brand = await page.locator('.wordmark').boundingBox();
  const image = await page.locator('.work-image').first().boundingBox();
  expect(Math.abs(image.x - brand.x)).toBeLessThan(1);
  const language = await page.locator('.language-select').boundingBox();
  const lastLink = await page.locator('.navigation a').last().boundingBox();
  expect(language.x).toBeGreaterThan(lastLink.x + lastLink.width);
  expect(image.y).toBeLessThan(300);
  const first = page.locator('.work-link').first();
  await expect(first.locator('.work-overlay')).toHaveCSS('opacity', '0');
  await first.hover();
  await expect(first.locator('.work-overlay')).toHaveCSS('opacity', '1');
  await expect(first.locator('.work-overlay')).toHaveCSS('background-color', 'rgb(51, 151, 255)');
  await expect(first.locator('.work-title')).toHaveText('Slow afternoons');
  await expect(first.locator('.work-category')).toHaveText('artistic');
  const title = await first.locator('.work-title').boundingBox();
  const category = await first.locator('.work-category').boundingBox();
  expect(category.x).toBeGreaterThan(title.x + title.width);
});

test('artworks load, both categories filter correctly, and project navigation works', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  for (const image of await page.locator('.work-image img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  for (const category of ['artistic', 'commercial']) {
    const button = page.getByRole('link', { name: category, exact: true });
    await button.click();
    await expect(page.locator('.work-item')).toHaveCount(3);
    await expect(button).toHaveAttribute('aria-current', 'page');
    await expect(page).toHaveURL(`/?category=${category}`);
    await page.reload();
    await expect(page.locator('.work-item')).toHaveCount(3);
    await expect(page.locator('.work-category')).toHaveText([category, category, category]);
  }
  await page.getByRole('link', { name: 'all works', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(6);
  await page.getByRole('link', { name: 'View Slow afternoons' }).click();
  await expect(page).toHaveURL('/work/slow-afternoons');
  await expect(page.locator('h1')).toHaveText('Slow afternoons');
  await page.locator('.next-project').click();
  await expect(page).toHaveURL('/work/a-place-to-be');
  await expect(page).toHaveTitle('A place to be — Wanyue Wang');
  await page.reload();
  await expect(page.locator('h1')).toHaveText('A place to be');
  await expect(errors).toEqual([]);
});

test('Chinese and English translate projects, About and contact and persist on reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('combobox', { name: 'Language' }).selectOption('zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('.navigation a')).toHaveText(['全部作品', '艺术创作', '商业合作', '关于', '联系']);
  const fonts = await platformFonts(page, '.nav-link');
  expect(fonts.some(font => ['JinNanJunJunTi', '荆南俊俊体'].includes(font.familyName) && font.isCustomFont)).toBe(true);
  await expect(page.locator('.work-filters')).toHaveCount(0);
  await page.getByRole('link', { name: '商业合作', exact: true }).click();
  await expect(page.locator('.work-item')).toHaveCount(3);
  await page.getByRole('link', { name: '查看 一隅栖所' }).click();
  await expect(page.locator('h1')).toHaveText('一隅栖所');
  await expect(page.locator('.project-story')).toContainText('归属感');
  await expect(page).toHaveTitle('一隅栖所 — Wanyue Wang');
  await page.reload();
  await expect(page.getByRole('combobox', { name: '语言' })).toHaveValue('zh');
  await expect(page.locator('h1')).toHaveText('一隅栖所');
  await page.getByRole('link', { name: '关于', exact: true }).click();
  await expect(page.getByRole('heading', { name: '你好，我是 Wanyue。' })).toBeVisible();
  await expect(page.locator('.contact-list dt')).toHaveText(['微信', '邮箱', 'Instagram']);
  await page.getByRole('link', { name: '艺术创作', exact: true }).click();
  await expect(page).toHaveURL('/?category=artistic');
  await expect(page.locator('.work-item')).toHaveCount(3);
  await page.getByRole('link', { name: '关于', exact: true }).click();
  await page.getByRole('combobox', { name: '语言' }).selectOption('en');
  await expect(page.getByRole('heading', { name: 'Hello, I’m Wanyue.' })).toBeVisible();
  await expect(page.locator('.navigation a')).toHaveText(['all works', 'artistic', 'commercial', 'about', 'contact']);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Language' })).toHaveValue('en');
});

test('six detail routes, 404 and plain contact information work', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.project-cover img')).toBeVisible();
    await expect.poll(() => page.locator('.project-cover img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await page.getByRole('link', { name: 'contact', exact: true }).click();
  await expect(page).toHaveURL('/#contact');
  await expect(page.locator('.email-link')).toBeInViewport();
  await expect(page.locator('#contact h2')).toHaveText('contact');
  await expect(page.locator('.contact-list dt')).toHaveText(['WeChat', 'Email', 'Instagram']);
  await expect(page.locator('.contact-list dd')).toHaveText(['w2013729-', 'wwwwanyuew@gmail.com', '@wwwwanyue']);
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:wwwwanyuew@gmail.com');
  await expect(page.locator('.instagram-link')).toHaveAttribute('href', 'https://www.instagram.com/wwwwanyue/');
  await expect(page.locator('.instagram-link')).toHaveAttribute('rel', 'noreferrer');
  await expect(page.locator('#contact svg, #contact img, #contact button, #contact .eyebrow')).toHaveCount(0);
  await expect(page.locator('#contact')).toHaveCSS('border-top-width', '0px');
  await page.goto('/work/does-not-exist');
  await expect(page.getByRole('heading', { name: 'Nothing growing here. Yet.' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to the gallery' }).click();
  await expect(page).toHaveURL('/');
});

test('both languages inherit the uploaded font and fit mobile, tablet and desktop', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ['en', 'zh']) {
      await page.goto('/');
      await page.locator('.language-select').selectOption(language);
      for (const route of ['/', '/about', '/work/slow-afternoons', '/work/a-place-to-be']) {
        await page.goto(route);
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        const invalid = await page.evaluate(() => [...document.querySelectorAll('body *')]
          .filter(el => !el.children.length && el.textContent.trim() && getComputedStyle(el).display !== 'none')
          .filter(el => !getComputedStyle(el).fontFamily.includes('Trattatello'))
          .map(el => ({ text: el.textContent.slice(0, 30), font: getComputedStyle(el).fontFamily })));
        expect(invalid).toEqual([]);
      }
    }
  }
});

test('touch users can read artwork titles and open a detail without hovering', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  const card = page.locator('.work-link').first();
  await expect(card.locator('.work-overlay')).toHaveCSS('opacity', '1');
  await card.tap();
  await expect(page.locator('h1')).toHaveText('Slow afternoons');
  await page.getByRole('link', { name: 'All works', exact: true }).tap();
  await expect(page).toHaveURL('http://127.0.0.1:4173/#selected-work');
  await context.close();
});
