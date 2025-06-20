// controllers/authController.js
console.log('authController loaded');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const sequelize = require('../config/db');

// Import each profile model here (we’ll create them next)
const AgronomyProfile = require('../models/agronomyProfile');
const GolfProfile = require('../models/golfProfile');
const OperationsProfile = require('../models/operationsProfile');
const GreenkeeperProfile = require('../models/greenkeeperProfile');

const register = async (req, res) => {
  const { full_name, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      password_hash: hash,
      role,
    });

    // Create profile based on role
    switch (role) {
      case 'agronomy':
        await AgronomyProfile.create({ user_id: newUser.id, specialization: '', experience_years: 0 });
        break;
      case 'golf':
        await GolfProfile.create({ user_id: newUser.id });
        break;
      case 'operations':
        await OperationsProfile.create({ user_id: newUser.id, zone_assigned: 'Zone A' });
        break;
      case 'greenkeeper':
        await GreenkeeperProfile.create({ user_id: newUser.id, machine_certification: 'none', assigned_area: 'Area 1' });
        break;
    }

    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({ token, user: { id: user.id, full_name: user.full_name, role: user.role } });
  }catch (err) {
      console.error(err);  // ✅ Already there, good
      return res.status(500).json({ message: 'Server error.', error: err.message });
    }
};

module.exports = { register, login };
