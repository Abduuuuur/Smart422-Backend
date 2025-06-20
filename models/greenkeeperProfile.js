// models/greenkeeperProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GreenkeeperProfile = sequelize.define('GreenkeeperProfile', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  machine_certification: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  assigned_area: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  irrigation_responsibility: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'greenkeeper_profiles',
  timestamps: false,
});

module.exports = GreenkeeperProfile;
