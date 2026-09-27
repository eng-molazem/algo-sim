const express = require('express');
const {
  listSimulations,
  getSimulation,
  createSimulation,
  deleteSimulation,
} = require('../controllers/simulationController');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listSimulations));
router.post('/', asyncHandler(createSimulation));
router.get('/:id', asyncHandler(getSimulation));
router.delete('/:id', asyncHandler(deleteSimulation));

module.exports = router;
