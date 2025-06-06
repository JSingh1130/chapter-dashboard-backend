require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rate Limiting Middleware
const rateLimiter = require('./middlewares/rateLimiter');
app.use(rateLimiter);

// ✅ Root route to fix 502 Bad Gateway on Render
app.get('/', (req, res) => {
  res.send('📘 Chapter Dashboard API is running!');
});

// ✅ API Routes
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
