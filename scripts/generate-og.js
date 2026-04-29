/**
 * OG image generator — Playwright HTML→PNG.
 * Switched from Sharp+SVG (Apr 2026) because Sharp's renderer was
 * silently no-op'ing lengthAdjust and not loading custom fonts.
 * Playwright + real browser + Google Fonts = reliable text rendering.
 *
 * Output: public/og-image.png (1200x630, retina via deviceScaleFactor 2)
 */
const { chromium } = require('/Users/jasher/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const W = 1200;
const H = 630;
const PUBLIC = path.join(__dirname, '..', 'public');

const photoPath = path.join(PUBLIC, 'jasher-avatar.png');
const photoB64 = fs.readFileSync(photoPath).toString('base64');
const photoUri = `data:image/png;base64,${photoB64}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3A6EE8;
    --ink: #0C1628;
    --text: #1d293a;
    --text-muted: #475569;
    --text-faint: #7C8BA1;
    --bg: #F4F6FB;
  }
  html, body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    background: var(--bg);
    font-family: 'DM Sans', -apple-system, system-ui, sans-serif;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1, "liga" 1;
  }
  .stage { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }

  /* THS Blue top stripe */
  .stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 7px;
    background: linear-gradient(90deg, var(--blue) 0%, #7aaaff 55%, rgba(58,110,232,0.2) 100%);
  }

  /* Photo on right */
  .photo {
    position: absolute; top: 0; right: 0;
    width: 660px; height: ${H}px;
    background: url('${photoUri}') center / cover no-repeat;
  }
  /* Background-color masking gradient over photo's left edge.
     Tight: hold bg only through name's safe-zone overlap, then clear quickly so the FACE (centered around photo midpoint) is fully unobscured. */
  .photo::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg,
      var(--bg) 0%, var(--bg) 15%,
      rgba(244,246,251,0) 38%);
  }

  /* Text block — horizontally centered in the visible left panel
     (the area between canvas left edge and where the face becomes
     fully visible). Text block right edge sits ~30px before the
     photo begins, leaving clean breathing room. */
  .text {
    position: absolute; left: 220px; top: 90px;
    display: flex; flex-direction: column;
  }

  /* Name — 3 lines, Space Grotesk Bold, naturally wide layout */
  .name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: var(--ink);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }
  .name-line-1 { font-size: 100px; }
  .name-line-2 { font-size: 95px; margin-top: 6px; }
  .name-line-3 { font-size: 86px; margin-top: 6px; }

  /* Accent rule */
  .accent {
    width: 90px; height: 5px; background: var(--blue);
    border-radius: 3px; margin: 18px 0 0 0;
  }

  /* Role */
  .role {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 600; color: var(--text);
    margin-top: 18px; letter-spacing: -0.01em;
  }

  /* Credentials */
  .creds {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px; font-weight: 500; color: var(--text-faint);
    margin-top: 6px; letter-spacing: 0.01em;
  }

  /* Open to work badge */
  .status {
    display: flex; align-items: center; gap: 12px;
    margin-top: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 20px; font-weight: 500; color: var(--text);
  }
  .dot {
    width: 13px; height: 13px; border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
  }

  /* URL — aligned with text block left edge */
  .url {
    position: absolute; top: 30px; left: 220px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: #94A3B8; letter-spacing: 0.06em;
    text-transform: uppercase; font-weight: 600;
  }
</style>
</head>
<body>
<div class="stage">
  <div class="stripe"></div>
  <div class="photo"></div>
  <div class="text">
    <div class="name name-line-1">Jasher</div>
    <div class="name name-line-2">Joshua</div>
    <div class="name name-line-3">A. Chan</div>
    <div class="accent"></div>
    <div class="role">AI Automation Engineer</div>
    <div class="creds">n8n · Claude · Agent Systems</div>
    <div class="status"><span class="dot"></span><span>Open to Work &amp; Consulting</span></div>
  </div>
  <div class="url">jasherchan.truehubsolutions.com</div>
</div>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const out = path.join(PUBLIC, 'og-image.png');
  await page.screenshot({ path: out, type: 'png', omitBackground: false });
  await browser.close();
  console.log(`✓ ${out} generated (${W}×${H})`);
})().catch((err) => { console.error(err); process.exit(1); });
