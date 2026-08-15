import { expect, test } from "@playwright/test";
import "playwright-odiff/setup";

test("approved home-page visual baseline", async ({ page }) => {
  test.skip(
    !process.env.VISUAL_BASELINE_APPROVAL_ID,
    "A Jasher-approved visual baseline is required before screenshot comparison.",
  );
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshotOdiff("home.png", {
    fullPage: true,
    animations: "disabled",
  });
});
