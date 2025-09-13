// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your index.html from 'public' folder

app.post('/api/register', (req, res) => {
  const { name, owner, description, repo } = req.body;
  if (!name || !owner || !description) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const entry = {
    name, owner, description, repo, date: new Date().toISOString()
  };
  // Save to a file (append)
  fs.appendFileSync(path.join(__dirname, 'registrations.json'), JSON.stringify(entry) + '\n');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});