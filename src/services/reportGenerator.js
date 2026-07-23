function formatReport({ url, inspection, riskAnalysis, screenshot }) {
  return {
    url,
    timestamp: new Date().toISOString(),
    page: {
      title: inspection.title,
      url: inspection.pageUrl,
      hostname: inspection.hostname
    },
    forms: {
      detected: inspection.hasLoginForm,
      count: inspection.formCount,
      loginForms: inspection.loginForms
    },
    risk: {
      classification: riskAnalysis.classification,
      score: riskAnalysis.score,
      findings: riskAnalysis.findings
    },
    screenshot
  };
}

module.exports = { formatReport };
