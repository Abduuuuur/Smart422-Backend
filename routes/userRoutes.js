const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  User,
  AgronomyProfile,
  GolfProfile,
  OperationsProfile,
  GreenkeeperProfile,
} = require('../models');

// GET /api/user/profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'full_name', 'email', 'role', 'profile_photo', 'created_at'],
      include: [
        { model: AgronomyProfile, required: false },
        { model: GolfProfile, required: false },
        { model: OperationsProfile, required: false },
        { model: GreenkeeperProfile, required: false },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('[Profile Error]', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
