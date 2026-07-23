async function captureScreenshot(page) {
  const screenshotBuffer = await page.screenshot({ fullPage: true });
  return {
    contentType: 'image/png',
    data: screenshotBuffer.toString('base64')
  };
}

module.exports = { captureScreenshot };
