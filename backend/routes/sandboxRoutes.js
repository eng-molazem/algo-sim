const express = require('express');
const { submitAttempt, getLeaderboard } = require('../controllers/sandboxController');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/attempts', protect, asyncHandler(submitAttempt));
router.get('/leaderboard/:algorithm', protect, asyncHandler(getLeaderboard));

module.exports = router;
