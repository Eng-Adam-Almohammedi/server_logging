const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/log', (req, res) => {
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(req.body)}\n`;
  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
      return res.status(500).send('Failed to write log');
    }
    res.status(200).send('Log recorded');
  });
});

app.listen(port, () => {
  console.log(`Logging server listening at http://localhost:${port}`);
});