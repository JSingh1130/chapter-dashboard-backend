// middlewares/rateLimiter.js
const redisClient = require('../utils/redisClient');

const RATE_LIMIT_WINDOW = 60; // in seconds
const MAX_REQUESTS = 30; // ⬅️ reduce for testing

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const key = `ratelimit:${ip}`;

    const current = await redisClient.incr(key);
    console.log(`IP ${ip} - ${current}/${MAX_REQUESTS}`);

    if (current === 1) {
      await redisClient.expire(key, RATE_LIMIT_WINDOW);
    }

    if (current > MAX_REQUESTS) {
      return res.status(429).json({ error: 'Too many requests. Try again later.' });
    }

    next();
  } catch (err) {
    console.error('Rate Limiting Error:', err);
    res.status(500).json({ error: 'Rate limiting failed' });
  }
};

module.exports = rateLimiter;
