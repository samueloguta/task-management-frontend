const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  getUser,
  updateUser,
  getStats
} = require('../controllers/userController');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/stats', protect, authorize('admin'), getStats);
router.put('/:id', protect, authorize('admin'), updateUser);

module.exports = router;