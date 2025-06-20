const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if you're in production (Railway or Vercel)
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

module.exports = sequelize;
