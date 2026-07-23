const test = require('node:test');
const assert = require('node:assert/strict');
const { validateUrl } = require('../src/utils/validateUrl');
const { scoreRisk } = require('../src/services/riskEngine');

test('validateUrl accepts http urls', () => {
  assert.equal(validateUrl('https://example.com'), 'https://example.com/');
});

test('risk engine treats a matching URL/content signal as reassuring', () => {
  const inspection = {
    hasLoginForm: true,
    title: 'PayPal Login',
    headers: ['Secure Login'],
    contentKeywords: ['paypal', 'login'],
    loginForms: [{ hasPassword: true }],
    urlKeywordMatches: ['paypal']
  };

  const result = scoreRisk(inspection, 'https://paypal.example/login');
  assert.equal(result.classification, 'safe');
  assert.ok(result.findings.some((finding) => finding.message.includes('matches the target URL')));
});

test('risk engine increases suspicion when page content does not match the target URL', () => {
  const inspection = {
    hasLoginForm: true,
    title: 'PayPal Login',
    headers: ['Secure Login'],
    contentKeywords: ['paypal'],
    loginForms: [{ hasPassword: true }],
    urlKeywordMatches: []
  };

  const result = scoreRisk(inspection, 'https://secure.example/login');
  assert.equal(result.classification, 'high_risk');
  assert.ok(result.findings.some((finding) => finding.message.includes('does not match the target URL')));
});
