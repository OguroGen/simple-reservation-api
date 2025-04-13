const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/reservations', async (req, res) => {
  const { name, datetime } = req.body;

  if (!name || !datetime) {
    return res.status(400).json({ error: 'Missing name or datetime' });
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([{ name, datetime }])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database insert failed' });
  }

  res.status(201).json(data[0]);
});

app.get('/api/reservations', async (req, res) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('datetime', { ascending: true });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database fetch failed' });
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});