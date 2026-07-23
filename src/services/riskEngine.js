function scoreRisk(inspection, targetUrl) {
  const findings = [];
  let score = 0;

  const normalizedUrl = (targetUrl || inspection?.pageUrl || '').toLowerCase();
  const title = (inspection?.title || '').toLowerCase();
  const headers = (inspection?.headers || []).join(' ').toLowerCase();
  const contentText = [title, headers, (inspection?.textSnippet || '').toLowerCase()].join(' ');

  const contentKeywords = (inspection?.contentKeywords || []).filter(Boolean);
  const urlKeywordMatches = contentKeywords.filter((keyword) => normalizedUrl.includes(keyword.toLowerCase()));
  const urlKeywordMismatch = contentKeywords.some((keyword) => !normalizedUrl.includes(keyword.toLowerCase()));

  console.log('[riskEngine] inspection:', JSON.stringify(inspection, null, 2));
  console.log('[riskEngine] targetUrl:', targetUrl || inspection?.pageUrl);
  console.log('[riskEngine] contentKeywords:', contentKeywords);
  console.log('[riskEngine] urlKeywordMatches:', urlKeywordMatches);

  if (!inspection?.hasLoginForm) {
    findings.push({ level: 'info', message: 'No login form detected' });
    return { classification: 'safe', score, findings };
  }

  findings.push({ level: 'info', message: 'Login form detected' });

  if (urlKeywordMatches.length > 0) {
    findings.push({ level: 'info', message: `Page content matches the target URL: ${urlKeywordMatches.join(', ')}` });
  } else if (urlKeywordMismatch && contentText.length > 0) {
    score += 2;
    findings.push({ level: 'high', message: 'Page content does not match the target URL, which is suspicious' });
  } else if (contentText.length > 0) {
    findings.push({ level: 'info', message: 'No clear keyword signal found' });
  }

  let classification = 'safe';
  if (score >= 2) {
    classification = 'high_risk';
  } else if (score >= 1) {
    classification = 'suspicious';
  }

  return { classification, score, findings };
}

module.exports = { scoreRisk };
