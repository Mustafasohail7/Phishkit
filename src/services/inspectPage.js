async function inspectPage(page) {
  return page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    const loginForms = [];

    forms.forEach((form) => {
      const inputs = Array.from(form.querySelectorAll('input'));
      const hasEmail = inputs.some((input) => /email|username/i.test(input.name || '') || /email|username/i.test(input.type || ''));
      const hasPassword = inputs.some((input) => /password/i.test(input.name || '') || /password/i.test(input.type || ''));

      if (hasEmail || hasPassword) {
        loginForms.push({
          hasEmail,
          hasPassword,
          inputNames: inputs.map((input) => input.name || input.type || 'input')
        });
      }
    });

    const pageUrl = window.location.href;
    const hostname = window.location.hostname;
    const title = document.title || '';
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map((el) => el.innerText.trim()).filter(Boolean);
    const bodyText = document.body ? document.body.innerText : '';
    const contentText = [title, ...headers, bodyText].join(' ').toLowerCase();
    const contentKeywords = Array.from(new Set(contentText.match(/[a-z0-9]{3,}/g) || []));

    console.log('[inspectPage] pageUrl:', pageUrl);
    console.log('[inspectPage] hostname:', hostname);
    console.log('[inspectPage] title:', title);
    console.log('[inspectPage] headers:', headers);
    console.log('[inspectPage] contentKeywords:', contentKeywords.slice(0, 20));

    return {
      pageUrl,
      hostname,
      title,
      headers,
      contentKeywords,
      loginForms,
      formCount: forms.length,
      hasLoginForm: loginForms.length > 0,
      textSnippet: bodyText.slice(0, 400)
    };
  });
}

module.exports = { inspectPage };
