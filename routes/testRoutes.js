// routes/testRoutes.js
const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.use(rateLimiter);

router.get('/weather', serviceController.getWeather);

router.get('/quote', serviceController.getQuote);

router.get('/dog', serviceController.getDogImage);

router.get('/cat-fact', serviceController.getCatFact);

router.get('/random-user', serviceController.getRandomUser);

router.get('/joke', serviceController.getJoke);

router.get('/crypto', serviceController.getCryptoPrice);

router.get('/ip-info', serviceController.getIPInfo);

router.get('/status', (req, res) => {
  res.json({ 
    message: 'API key is valid and working!',
    remainingRequests: req.remainingRequests,
    rateLimit: req.rateLimit
  });
});

module.exports = router;