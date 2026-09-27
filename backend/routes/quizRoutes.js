const express = require('express');
const {
  createQuiz,
  listQuizzesForAlgorithm,
  listAllQuizzes,
  listMyQuizzes,
  submitAttempt,
  deleteQuiz,
} = require('../controllers/quizController');
const { protect, requireInstructor } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(protect);
router.post('/', requireInstructor, asyncHandler(createQuiz));
router.get('/mine', requireInstructor, asyncHandler(listMyQuizzes));
router.get('/', asyncHandler(listAllQuizzes));
router.get('/algorithm/:algorithm', asyncHandler(listQuizzesForAlgorithm));
router.post('/:id/attempts', asyncHandler(submitAttempt));
router.delete('/:id', requireInstructor, asyncHandler(deleteQuiz));

module.exports = router;
