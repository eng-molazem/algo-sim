const mongoose = require('mongoose');

function generateJoinCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    joinCode: { type: String, required: true, unique: true, default: generateJoinCode },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Section', sectionSchema);
