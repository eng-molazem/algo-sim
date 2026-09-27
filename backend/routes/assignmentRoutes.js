const express = require('express');
const { createAssignment, listAssignments, deleteAssignment } = require('../controllers/assignmentController');
const { protect, requireInstructor } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listAssignments));
router.post('/', requireInstructor, asyncHandler(createAssignment));
router.delete('/:id', requireInstructor, asyncHandler(deleteAssignment));

module.exports = router;
