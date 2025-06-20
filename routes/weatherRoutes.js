// backend/routes/weatherRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/forecast', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) return res.status(400).json({ message: 'Missing lat or lon' });

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,dew_point_2m,wind_speed_10m,is_day&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

module.exports = router;
