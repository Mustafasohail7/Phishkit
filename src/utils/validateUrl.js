function validateUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || rawUrl.trim() === '') {
    throw new Error('A valid URL is required');
  }

  const trimmedUrl = rawUrl.trim();

  try {
    const parsed = new URL(trimmedUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only http and https URLs are supported');
    }
    return parsed.toString();
  } catch (error) {
    throw new Error('A valid URL is required');
  }
}

module.exports = { validateUrl };
