const mongoose = require('mongoose');

const apiUsageSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  windowStart: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ApiUsage', apiUsageSchema);
