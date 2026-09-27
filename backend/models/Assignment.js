const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    algorithm: { type: String, required: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
