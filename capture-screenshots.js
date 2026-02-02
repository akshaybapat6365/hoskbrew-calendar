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

  const preparePage = async (page) => {
    await page.evaluate(() => {
      document.querySelectorAll(".month-card").forEach((c) => {
        c.classList.add("visible");
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      });
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";
    });
    await page.waitForTimeout(1000);
  };

  try {
    console.log("Capturing desktop light theme...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(URL, { waitUntil: "networkidle" });
    await preparePage(desktopPage);
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, "light-desktop.png"),
      fullPage: false,
    });
    console.log("✓ light-desktop.png captured");
    await desktopContext.close();

    console.log("Capturing desktop dark theme...");
    const desktopDarkContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const desktopDarkPage = await desktopDarkContext.newPage();
    await desktopDarkPage.goto(URL, { waitUntil: "networkidle" });
    await preparePage(desktopDarkPage);
    await desktopDarkPage.click("#themeToggle");
    await desktopDarkPage.waitForTimeout(500);
    await desktopDarkPage.screenshot({
      path: path.join(OUTPUT_DIR, "dark-desktop.png"),
      fullPage: false,
    });
    console.log("✓ dark-desktop.png captured");
    await desktopDarkContext.close();

    console.log("Capturing mobile light theme...");
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(URL, { waitUntil: "networkidle" });
    await preparePage(mobilePage);
    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, "light-mobile.png"),
      fullPage: false,
    });
    console.log("✓ light-mobile.png captured");
    await mobileContext.close();

    console.log("Capturing mobile dark theme...");
    const mobileDarkContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    });
    const mobileDarkPage = await mobileDarkContext.newPage();
    await mobileDarkPage.goto(URL, { waitUntil: "networkidle" });
    await preparePage(mobileDarkPage);
    await mobileDarkPage.click("#themeToggle");
    await mobileDarkPage.waitForTimeout(500);
    await mobileDarkPage.screenshot({
      path: path.join(OUTPUT_DIR, "dark-mobile.png"),
      fullPage: false,
    });
    console.log("✓ dark-mobile.png captured");
    await mobileDarkContext.close();

    console.log("Capturing feature highlights...");
    const featureContext = await browser.newContext({
      viewport: { width: 1200, height: 800 },
      deviceScaleFactor: 2,
    });
    const featurePage = await featureContext.newPage();
    await featurePage.goto(URL, { waitUntil: "networkidle" });
    await preparePage(featurePage);
    await featurePage.evaluate(() => window.scrollTo(0, 500));
    await featurePage.waitForTimeout(500);
    await featurePage.screenshot({
      path: path.join(OUTPUT_DIR, "feature-overview.png"),
      fullPage: false,
    });
    console.log("✓ feature-overview.png captured");
    await featureContext.close();

    console.log("\n✅ All screenshots captured successfully!");
  } catch (error) {
    console.error("❌ Error capturing screenshots:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
