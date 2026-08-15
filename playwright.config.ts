import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    browserName: "chromium",
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command:
          "NEXT_PUBLIC_N8N_RESUME_WEBHOOK=https://example.com/webhook/ci-placeholder npm run build && python3 -m http.server 3000 -d out",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
      },
});
