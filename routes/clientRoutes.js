const express = require('express');
const Client = require('../models/Client');
const crypto = require('crypto');
const ApiUsage = require('../models/ApiUsage');
const auth = require('../middleware/auth');

const router = express.Router();

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

router.post('/', auth, async (req, res) => {
  try {
    const { name, rateLimit } = req.body;

    if (!name || !rateLimit) {
      return res.status(400).json({ message: 'Name and rateLimit required' });
    }

    const apiKey = generateApiKey();

    const client = await Client.create({
      userId: req.user.userId,
      name,
      apiKey,
      rateLimit
    });

    res.status(201).json({
      _id: client._id,
      name: client.name,
      apiKey: client.apiKey,
      rateLimit: client.rateLimit
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/regenerate', auth, async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id,
      userId: req.user.userId 
    });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const oldKey = client.apiKey;
    const newKey = crypto.randomBytes(32).toString('hex');

    client.apiKey = newKey;
    await client.save();


    await ApiUsage.deleteOne({ apiKey: oldKey });

    res.json({
      oldApiKey: oldKey,
      newApiKey: newKey
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.user.userId })
      .select('name apiKey rateLimit createdAt');

    const clientsWithUsage = await Promise.all(
      clients.map(async (client) => {
        const usage = await ApiUsage.findOne({ apiKey: client.apiKey });
        
        return {
          _id: client._id,
          name: client.name,
          apiKey: client.apiKey,
          rateLimit: client.rateLimit,
          createdAt: client.createdAt,
          requestCount: usage ? usage.count : 0, 
          windowStart: usage ? usage.windowStart : new Date()
        };
      })
    );

    res.json(clientsWithUsage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/usage', auth, async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id,
      userId: req.user.userId 
    });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const usage = await ApiUsage.findOne({ apiKey: client.apiKey });

    if (!usage) {
      return res.json({
        rateLimit: client.rateLimit,
        usedRequests: 0,
        remainingRequests: client.rateLimit
      });
    }

    res.json({
      rateLimit: client.rateLimit,
      usedRequests: usage.count,
      remainingRequests: Math.max(client.rateLimit - usage.count, 0)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findOne({
      _id: id,
      user: req.user.id 
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.deleteOne();

    res.status(200).json({
      message: 'Client deleted successfully',
      clientId: id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
