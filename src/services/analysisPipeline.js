const fs = require('fs');
const { chromium } = require('playwright');
const { inspectPage } = require('./inspectPage');
const { scoreRisk } = require('./riskEngine');
const { formatReport } = require('./reportGenerator');
const { captureScreenshot } = require('./screenshotCapture');

async function runAnalysis(url) {
  let browser;

  try {
    const browserExecutable = process.env.PLAYWRIGHT_EXECUTABLE_PATH || '/usr/bin/google-chrome';
    const launchOptions = { headless: true };

    if (fs.existsSync(browserExecutable)) {
      launchOptions.executablePath = browserExecutable;
      launchOptions.args = ['--no-sandbox', '--disable-dev-shm-usage'];
    }

    browser = await chromium.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    const inspection = await inspectPage(page);
    console.log('[analyze] inspection payload:', JSON.stringify(inspection, null, 2));
    const riskAnalysis = scoreRisk(inspection, url);
    console.log('[analyze] risk analysis:', JSON.stringify(riskAnalysis, null, 2));
    const screenshot = await captureScreenshot(page);

    return formatReport({
      url,
      inspection,
      riskAnalysis,
      screenshot,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { runAnalysis };
