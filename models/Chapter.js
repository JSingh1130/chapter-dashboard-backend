// models/Chapter.js
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  subject: { type: String, required: true },
  unit: { type: String, required: true },
  status: { type: String, enum: ['completed', 'pending'], default: 'pending' },
  isWeak: { type: Boolean, default: false },
});

module.exports = mongoose.model('Chapter', chapterSchema);
