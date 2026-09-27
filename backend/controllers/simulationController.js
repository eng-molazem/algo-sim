const Simulation = require('../models/Simulation');

async function listSimulations(req, res) {
  const simulations = await Simulation.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json({ simulations });
}

async function getSimulation(req, res) {
  const simulation = await Simulation.findOne({ _id: req.params.id, user: req.user.id });
  if (!simulation) return res.status(404).json({ message: 'المحاكاة غير موجودة' });
  res.json({ simulation });
}

async function createSimulation(req, res) {
  const { category, algorithm, title, inputData, settings, lastStepIndex } = req.body;
  if (!category || !algorithm || !inputData) {
    return res.status(400).json({ message: 'بيانات المحاكاة غير مكتملة' });
  }

  const simulation = await Simulation.create({
    user: req.user.id,
    category,
    algorithm,
    title: title || `${algorithm} - ${new Date().toLocaleDateString()}`,
    inputData,
    settings: settings || {},
    lastStepIndex: lastStepIndex || 0,
  });

  res.status(201).json({ simulation });
}

async function deleteSimulation(req, res) {
  const simulation = await Simulation.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!simulation) return res.status(404).json({ message: 'المحاكاة غير موجودة' });
  res.json({ message: 'تم حذف المحاكاة بنجاح' });
}

module.exports = { listSimulations, getSimulation, createSimulation, deleteSimulation };
