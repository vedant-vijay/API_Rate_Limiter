const express = require('express');
const Client = require('../models/Client');
const ApiUsage = require('../models/ApiUsage');

const router = express.Router();

const WINDOW_SIZE = 60 * 60 * 1000; // 1 hour

router.get('/:apiKey', async (req, res) => {
  try {
    const { apiKey } = req.params;

    const client = await Client.findOne({ apiKey });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    let usage = await ApiUsage.findOne({ apiKey });
    const now = new Date();

    if (!usage) {
      usage = await ApiUsage.create({
        apiKey,
        count: 0,
        windowStart: now
      });
    }

    if (!usage.windowStart) {
      usage.windowStart = now;
      await usage.save();
    }

    const windowEnd = new Date(usage.windowStart.getTime() + WINDOW_SIZE);

    const remainingRequests = Math.max(client.rateLimit - usage.count, 0);

    res.json({
      rateLimit: client.rateLimit,
      usedRequests: usage.count,
      remainingRequests,
      windowStart: usage.windowStart,
      windowEnd
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
