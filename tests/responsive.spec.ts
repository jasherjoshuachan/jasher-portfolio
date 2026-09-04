import { expect, test } from "@playwright/test";

const sizes = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

for (const size of sizes) {
  test(`home remains readable at ${size.name}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /download résumé/i })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
}

test("case study discloses evidence and limits by keyboard", async ({ page }) => {
  await page.goto("/work/ths-whatsapp-intake", { waitUntil: "networkidle" });
  const evidence = page.getByRole("button", { name: /evidence and verification/i });
  await evidence.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: /view public repository/i })).toBeVisible();
});
