// models/operationsProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OperationsProfile = sequelize.define('OperationsProfile', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  shift_schedule: {
    type: DataTypes.ENUM('Morning', 'Evening', 'Night'),
    defaultValue: 'Morning',
  },
  zone_assigned: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tools_access: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
}, {
  tableName: 'operations_profiles',
  timestamps: false,
});

module.exports = OperationsProfile;
