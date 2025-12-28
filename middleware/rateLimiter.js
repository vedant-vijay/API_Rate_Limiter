
const Client = require('../models/Client');
const ApiUsage = require('../models/ApiUsage');

const WINDOW_SIZE = 60 * 60 * 1000; 

const rateLimiter = async (req, res, next) => {
  try {

    const apiKey = req.header('X-API-Key');

    if (!apiKey) {
      return res.status(401).json({ 
        error: 'API key is required',
        message: 'Please provide your API key in the X-API-Key header'
      });
    }

    const client = await Client.findOne({ apiKey });

    if (!client) {
      return res.status(403).json({ 
        error: 'Invalid API key',
        message: 'The provided API key is not valid'
      });
    }

    let usage = await ApiUsage.findOne({ apiKey });

    if (!usage) {
      usage = await ApiUsage.create({ 
        apiKey, 
        count: 0,
        windowStart: new Date()
      });
    }

    const now = new Date();
    const windowExpired = now - usage.windowStart > WINDOW_SIZE;

    if (windowExpired) {
 
      usage.count = 0;
      usage.windowStart = now;
      await usage.save();
      
      client.requestCount = 0;
      await client.save();
    }

    if (usage.count >= client.rateLimit) {
      const resetTime = new Date(usage.windowStart.getTime() + WINDOW_SIZE);
      const minutesUntilReset = Math.ceil((resetTime - now) / 60000);

      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        message: `You have exceeded your rate limit of ${client.rateLimit} requests per hour`,
        rateLimit: client.rateLimit,
        remainingRequests: 0,
        resetIn: `${minutesUntilReset} minutes`,
        resetAt: resetTime.toISOString()
      });
    }

    usage.count += 1;
    await usage.save();

    client.requestCount = usage.count;
    await client.save();

    req.rateLimit = client.rateLimit;
    req.remainingRequests = client.rateLimit - usage.count;
    req.clientName = client.name;

    res.setHeader('X-RateLimit-Limit', client.rateLimit);
    res.setHeader('X-RateLimit-Remaining', req.remainingRequests);
    res.setHeader('X-RateLimit-Reset', new Date(usage.windowStart.getTime() + WINDOW_SIZE).toISOString());

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing your request'
    });
  }
};

module.exports = rateLimiter;