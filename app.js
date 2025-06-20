console.log("App.js is running...");
require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first');

const express = require('express');
const app = express(); 
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');



 // <-- create app here BEFORE using it

 app.use(cors({
  origin: 'https://mart422-project-k676.vercel.app', // ✅ Use full Vercel URL
  credentials: true
}));
app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
