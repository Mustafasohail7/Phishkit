const express = require('express');
const path = require('path');
const analyzeRoute = require('./routes/analyze');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/analyze', analyzeRoute);

module.exports = app;
