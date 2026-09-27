const express = require('express');
const { getOverview } = require('../controllers/statsController');
const { protect, requireInstructor } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/overview', protect, requireInstructor, asyncHandler(getOverview));

module.exports = router;
