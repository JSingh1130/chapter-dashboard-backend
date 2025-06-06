// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const rateLimiter = require('./middlewares/rateLimiter');
app.use(rateLimiter); // apply globally

// Routes will go here
app.use('/api/v1/chapters', require('./routes/chapter.routes'));


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.error(err));
