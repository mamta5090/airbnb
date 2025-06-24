const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config(); // Load env variables first

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});