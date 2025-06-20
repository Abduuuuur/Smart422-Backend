// models/golfProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GolfProfile = sequelize.define('GolfProfile', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  handicap: {
    type: DataTypes.DECIMAL(4, 2),
    validate: { min: 0, max: 54 },
  },
  membership_level: {
    type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
  },
  preferred_club: {
    type: DataTypes.TEXT,
  },
  coach_name: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'golf_profiles',
  timestamps: false,
});

module.exports = GolfProfile;
