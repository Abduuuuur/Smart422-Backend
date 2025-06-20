// models/agronomyProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AgronomyProfile = sequelize.define('AgronomyProfile', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  specialization: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  experience_years: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0 },
  },
  sensor_access: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'agronomy_profiles',
  timestamps: false,
});

module.exports = AgronomyProfile;
