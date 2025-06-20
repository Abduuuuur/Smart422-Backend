console.log("App.js is running...");
require('dotenv').config();
const express = require('express');
const app = express(); 
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');



 // <-- create app here BEFORE using it

app.use(cors());

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
