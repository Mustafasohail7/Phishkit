const { validateUrl } = require('../utils/validateUrl');
const { runAnalysis } = require('../services/analysisPipeline');

async function analyze(req, res) {
  try {
    const rawUrl = req.body?.url || req.query?.url;
    const url = validateUrl(rawUrl);
    const result = await runAnalysis(url);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = analyze;
