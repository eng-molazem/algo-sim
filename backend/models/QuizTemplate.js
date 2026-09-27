const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correctIndex: { type: Number, required: true },
  },
  { _id: false }
);

const quizTemplateSchema = new mongoose.Schema(
  {
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    algorithm: { type: String, required: true },
    questions: { type: [questionSchema], required: true, validate: (v) => v.length > 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizTemplate', quizTemplateSchema);
