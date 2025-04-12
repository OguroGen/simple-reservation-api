const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const reservations = [];

app.post('/api/reservations', (req, res) => {
  const { name, datetime } = req.body;
  if (!name || !datetime) return res.status(400).json({ error: 'Missing fields' });
  const newReservation = { id: Date.now(), name, datetime };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
