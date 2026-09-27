const express = require('express');
const {
  createSection,
  listMySections,
  listJoinedSections,
  joinSection,
  deleteSection,
} = require('../controllers/sectionController');
const { protect, requireInstructor } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(protect);
router.post('/', requireInstructor, asyncHandler(createSection));
router.get('/mine', requireInstructor, asyncHandler(listMySections));
router.get('/joined', asyncHandler(listJoinedSections));
router.post('/join', asyncHandler(joinSection));
router.delete('/:id', requireInstructor, asyncHandler(deleteSection));

module.exports = router;
