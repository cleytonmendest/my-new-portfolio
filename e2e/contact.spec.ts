import { expect, test } from '@playwright/test';
import en from '../src/messages/en.json';
import pt from '../src/messages/pt.json';

const STRINGS = { en: en.site.contact, pt: pt.site.contact };
const VALID = { name: 'Ana Souza', email: 'ana@example.com', message: 'Hello, I would like to talk about a project.' };

for (const locale of ['en', 'pt'] as const) {
  const t = STRINGS[locale];

  test(`validation messages in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}#contact`);
    await page.getByRole('button', { name: t.form.submit, exact: true }).click();

    await expect(page.locator('#name-error')).toHaveText(t.validation.nameMin);
    await expect(page.locator('#email-error')).toHaveText(t.validation.emailInvalid);
    await expect(page.locator('#message-error')).toHaveText(t.validation.messageMin);
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');

    // After the first submit, fields revalidate while typing.
    await page.fill('#name', 'x'.repeat(101));
    await page.fill('#email', 'not an email');
    await page.fill('#message', 'y'.repeat(1001));
    await expect(page.locator('#name-error')).toHaveText(t.validation.nameMax);
    await expect(page.locator('#email-error')).toHaveText(t.validation.emailInvalid);
    await expect(page.locator('#message-error')).toHaveText(t.validation.messageMax);

    await page.fill('#name', VALID.name);
    await page.fill('#email', VALID.email);
    await page.fill('#message', VALID.message);
    await expect(page.locator('#name-error, #email-error, #message-error')).toHaveCount(0);
  });
}

// With the access key the form posts to Web3Forms (mocked here). A build without it opens the
// visitor's email app instead. CI builds with a key, so there the Web3Forms path is required.
test('a valid message is sent', async ({ page }) => {
  const t = STRINGS.en;
  const sent: { payload?: Record<string, unknown> } = {};
  await page.route('https://api.web3forms.com/submit', async (route) => {
    sent.payload = route.request().postDataJSON();
    await route.fulfill({ json: { success: true } });
  });

  await page.goto('/en#contact');
  await page.fill('#name', VALID.name);
  await page.fill('#email', VALID.email);
  await page.fill('#message', VALID.message);
  await page.getByRole('button', { name: t.form.submit, exact: true }).click();

  const status = page.locator('form [role="status"]');
  await expect(status).not.toBeEmpty();

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (accessKey) expect(sent.payload, 'the form should post to Web3Forms').toBeDefined();

  if (sent.payload) {
    expect(sent.payload).toMatchObject({ ...VALID, replyto: VALID.email });
    if (accessKey) expect(sent.payload.access_key).toBe(accessKey);
    await expect(status).toContainText(t.success);
    await expect(page.locator('#message')).toHaveValue('');
  } else {
    const href = await status.getByRole('link').getAttribute('href');
    const mailto = decodeURIComponent(href ?? '');
    expect(mailto).toMatch(/^mailto:[^?]+@[^?]+\?subject=/);
    for (const value of Object.values(VALID)) expect(mailto).toContain(value);
    await expect(page.locator('#message')).toHaveValue(VALID.message);
  }
});
