const mongoose = require('mongoose');

const sandboxAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    algorithm: { type: String, required: true },
    timeMs: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

sandboxAttemptSchema.index({ algorithm: 1, isCorrect: 1, timeMs: 1 });

module.exports = mongoose.model('SandboxAttempt', sandboxAttemptSchema);
