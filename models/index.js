const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const AgronomyProfile = require('./agronomyProfile');
const GolfProfile = require('./golfProfile');
const OperationsProfile = require('./operationsProfile');
const GreenkeeperProfile = require('./greenkeeperProfile');


// Associations
User.hasOne(AgronomyProfile, { foreignKey: 'user_id' });
AgronomyProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(GolfProfile, { foreignKey: 'user_id' });
GolfProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(OperationsProfile, { foreignKey: 'user_id' });
OperationsProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(GreenkeeperProfile, { foreignKey: 'user_id' });
GreenkeeperProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  AgronomyProfile,
  GolfProfile,
  OperationsProfile,
  GreenkeeperProfile,
};
