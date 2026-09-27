const express = require('express');
const { register, login, getMe, updateProfile, markAlgorithmComplete } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/me', protect, asyncHandler(getMe));
router.put('/me', protect, asyncHandler(updateProfile));
router.post('/progress', protect, asyncHandler(markAlgorithmComplete));

module.exports = router;
