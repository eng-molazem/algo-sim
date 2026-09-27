const mongoose = require('mongoose');

const sectionEnrollmentSchema = new mongoose.Schema(
  {
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

sectionEnrollmentSchema.index({ section: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('SectionEnrollment', sectionEnrollmentSchema);
