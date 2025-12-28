// controllers/serviceController.js
const axios = require('axios');

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo'; 
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    res.json({
      service: 'Weather API',
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    });
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getQuote = async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');

    res.json({
      service: 'ZenQuote API',
      quote: response.data[0].q,
      author: response.data[0].a
    });
  } catch (error) {
    console.error('Quote API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
};

exports.getDogImage = async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');

    res.json({
      service: 'Dog Image API',
      imageUrl: response.data.message,
      status: response.data.status
    });
  } catch (error) {
    console.error('Dog API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch dog image' });
  }
};

exports.getCatFact = async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');

    res.json({
      service: 'Cat Fact API',
      fact: response.data.fact,
      length: response.data.length
    });
  } catch (error) {
    console.error('Cat Fact API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch cat fact' });
  }
};

exports.getRandomUser = async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];

    res.json({
      service: 'Random User API',
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      location: `${user.location.city}, ${user.location.country}`,
      picture: user.picture.large
    });
  } catch (error) {
    console.error('Random User API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch random user' });
  }
};

exports.getJoke = async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');

    const joke = response.data.type === 'single' 
      ? response.data.joke 
      : `${response.data.setup} - ${response.data.delivery}`;

    res.json({
      service: 'Joke API',
      joke: joke,
      category: response.data.category
    });
  } catch (error) {
    console.error('Joke API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
};

exports.getCryptoPrice = async (req, res) => {
  try {
    const { coin = 'bitcoin' } = req.query;
    
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd,eur&include_24hr_change=true`
    );

    if (!response.data[coin]) {
      return res.status(404).json({ error: 'Cryptocurrency not found' });
    }

    res.json({
      service: 'Crypto Price API',
      coin: coin,
      priceUSD: response.data[coin].usd,
      priceEUR: response.data[coin].eur,
      change24h: response.data[coin].usd_24h_change?.toFixed(2) + '%'
    });
  } catch (error) {
    console.error('Crypto API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch crypto price' });
  }
};

exports.getIPInfo = async (req, res) => {
  try {
    const { ip } = req.query;
    
    if (!ip) {
      return res.status(400).json({ error: 'IP parameter is required' });
    }

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);

    res.json({
      service: 'IP Geolocation API',
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      timezone: response.data.timezone,
      currency: response.data.currency
    });
  } catch (error) {
    console.error('IP API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch IP information' });
  }
};