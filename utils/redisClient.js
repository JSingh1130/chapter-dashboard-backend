// utils/redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));
redisClient.on('connect', () => console.log('✅ Redis connected'));

redisClient.connect();

module.exports = redisClient;
