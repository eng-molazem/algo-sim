const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    category: {
      type: String,
      enum: ['sorting', 'searching', 'scheduling', 'linkedList', 'stack', 'tree'],
      required: true,
    },
    algorithm: { type: String, required: true },
    title: { type: String, required: true },
    inputData: { type: mongoose.Schema.Types.Mixed, required: true },
    settings: { type: mongoose.Schema.Types.Mixed, default: {} },
    lastStepIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Simulation', simulationSchema);
