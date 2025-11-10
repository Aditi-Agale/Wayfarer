const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

require('dotenv').config();

app.use(express.json());

app.post('/api/ai', async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found.' });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: messages,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error calling Mistral AI:', error);
    res.status(500).json({ error: 'Failed to fetch from Mistral AI' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
