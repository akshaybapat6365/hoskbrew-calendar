const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const URL = "https://hoskbrew-calendar.vercel.app";
const OUTPUT_DIR = "/home/mostltyharmless/hoskbrew-calendar-2026/screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log("Launching browser...");
  const browser = await chromium.launch();

  try {
    console.log("Capturing desktop light theme...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(URL, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, "light-desktop.png"),
      fullPage: true,
    });
    console.log("✓ light-desktop.png captured");
    await desktopContext.close();

    console.log("Capturing desktop dark theme...");
    const desktopDarkContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const desktopDarkPage = await desktopDarkContext.newPage();
    await desktopDarkPage.goto(URL, { waitUntil: "networkidle" });
    await desktopDarkPage.waitForTimeout(1000);
    await desktopDarkPage.click("#themeToggle");
    await desktopDarkPage.waitForTimeout(2000);
    await desktopDarkPage.screenshot({
      path: path.join(OUTPUT_DIR, "dark-desktop.png"),
      fullPage: true,
    });
    console.log("✓ dark-desktop.png captured");
    await desktopDarkContext.close();

    console.log("Capturing mobile light theme...");
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(URL, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, "light-mobile.png"),
      fullPage: true,
    });
    console.log("✓ light-mobile.png captured");
    await mobileContext.close();

    console.log("Capturing mobile dark theme...");
    const mobileDarkContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    const mobileDarkPage = await mobileDarkContext.newPage();
    await mobileDarkPage.goto(URL, { waitUntil: "networkidle" });
    await mobileDarkPage.waitForTimeout(1000);
    await mobileDarkPage.click("#themeToggle");
    await mobileDarkPage.waitForTimeout(2000);
    await mobileDarkPage.screenshot({
      path: path.join(OUTPUT_DIR, "dark-mobile.png"),
      fullPage: true,
    });
    console.log("✓ dark-mobile.png captured");
    await mobileDarkContext.close();

    console.log("Capturing feature highlights...");
    const featureContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const featurePage = await featureContext.newPage();
    await featurePage.goto(URL, { waitUntil: "networkidle" });
    await featurePage.waitForTimeout(2000);
    await featurePage.evaluate(() => window.scrollTo(0, 800));
    await featurePage.waitForTimeout(1000);
    await featurePage.screenshot({
      path: path.join(OUTPUT_DIR, "feature-overview.png"),
      fullPage: false,
    });
    console.log("✓ feature-overview.png captured");
    await featureContext.close();

    console.log("\n✅ All screenshots captured successfully!");
    console.log(`📁 Location: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error("❌ Error capturing screenshots:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
