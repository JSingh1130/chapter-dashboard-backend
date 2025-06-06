const express = require('express');
const fs = require('fs');
const Chapter = require('../models/Chapter');
const upload = require('../middlewares/uploadMiddleware');
const redisClient = require('../utils/redisClient'); // ✅ Redis setup

const router = express.Router();

// ✅ POST route: Upload chapters from JSON
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;
  let failedChapters = [];

  try {
    const rawData = fs.readFileSync(filePath);
    const chapters = JSON.parse(rawData);

    for (let chapter of chapters) {
      try {
        await Chapter.create(chapter);
      } catch (err) {
        failedChapters.push({ chapter, error: err.message });
      }
    }

    // 🧹 Invalidate all chapter-related cache
    await redisClient.flushAll();

    res.json({
      message: 'Upload completed',
      failedChapters,
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid JSON file or server error' });
  }
});

// ✅ GET route: Filters + Pagination + Caching
router.get('/', async (req, res) => {
  try {
    const { class: classFilter, unit, status, subject, weakChapters, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (classFilter) filters.class = classFilter;
    if (unit) filters.unit = unit;
    if (status) filters.status = status;
    if (subject) filters.subject = subject;
    if (weakChapters === 'true') filters.isWeak = true;
    if (weakChapters === 'false') filters.isWeak = false;

    const skip = (page - 1) * limit;

    // 🧠 Generate unique cache key
    const cacheKey = `chapters:${JSON.stringify(req.query)}`;

    // 🚀 Try fetching from Redis first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached)); // return cached response
    }

    // ❌ Not cached → fetch from DB
    const [chapters, totalChapters] = await Promise.all([
      Chapter.find(filters).skip(skip).limit(Number(limit)),
      Chapter.countDocuments(filters),
    ]);

    const response = {
      totalChapters,
      currentPage: Number(page),
      totalPages: Math.ceil(totalChapters / limit),
      data: chapters,
    };

    // 💾 Cache response in Redis for 1 hour (3600 seconds)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});

module.exports = router;
