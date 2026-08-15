import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no serious automated accessibility violations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();

  expect(scan.violations, JSON.stringify(scan.violations, null, 2)).toEqual([]);
});
