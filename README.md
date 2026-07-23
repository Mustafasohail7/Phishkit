# PhishKit Inspector

A minimal MVP Node.js backend for static phishing analysis.

## What it does

The service accepts a URL and returns a JSON analysis report with:

- page rendering via Playwright
- screenshot capture
- detection of login-like forms
- extraction of form action URLs
- comparison of form submission domain vs page domain
- simple risk classification: `safe`, `suspicious`, or `high_risk`

## Requirements

- Node.js 18+
- npm
- Google Chrome or Chromium available on the system

## Setup

From the project folder:

```bash
cd phishkit
npm install
```

If Playwright cannot find a browser binary, set this environment variable before starting the app:

```bash
export PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/google-chrome
```

## Run the server

```bash
npm start
```

The server will start on port `3000`.

## Test the API

Send a request to the analysis endpoint:

```bash
curl -X POST http://127.0.0.1:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

You should receive a JSON response containing:

- `url`
- `page`
- `forms`
- `risk`
- `screenshot`

## Run tests

```bash
npm test
```

## Successful completion check

A successful run should:

1. Start the server without errors
2. Return a JSON report from `/analyze`
3. Create a screenshot file in the `output` folder
4. Pass the automated tests
