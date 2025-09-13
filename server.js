// Basic backend to handle model registrations
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve index.html + assets

// Registration route
app.post('/api/register', (req, res) => {
  const { name, owner, description, repo } = req.body;

  if (!name || !owner || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const entry = {
    id: Date.now(),
    name,
    owner,
    description,
    repo,
    date: new Date().toISOString(),
  };

  // Save to file
  fs.appendFileSync(
    path.join(__dirname, 'registrations.json'),
    JSON.stringify(entry) + '\n'
  );

  console.log('New Registration:', entry);
  res.json({ success: true, model: entry });
});

// Health check
app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`✅ modNFTs backend running at http://localhost:${PORT}`);
});