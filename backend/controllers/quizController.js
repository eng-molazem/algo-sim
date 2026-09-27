const QuizTemplate = require('../models/QuizTemplate');
const QuizAttempt = require('../models/QuizAttempt');
const Section = require('../models/Section');
const SectionEnrollment = require('../models/SectionEnrollment');

function sanitizeQuestions(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [q, optsPart, correctPart] = line.split('|');
      if (!q || !optsPart || correctPart === undefined) return null;
      const options = optsPart.split(';').map((o) => o.trim()).filter(Boolean);
      const correctIndex = Number(correctPart.trim());
      if (options.length < 2 || Number.isNaN(correctIndex) || correctIndex < 0 || correctIndex >= options.length) {
        return null;
      }
      return { text: q.trim(), options, correctIndex };
    });
}

async function createQuiz(req, res) {
  const { title, category, algorithm, rawQuestions, questions, section } = req.body;
  if (!title || !category || !algorithm || !section) {
    return res.status(400).json({ message: 'عنوان الاختبار والفئة والخوارزمية والشعبة مطلوبة' });
  }

  const ownedSection = await Section.findOne({ _id: section, instructor: req.user.id });
  if (!ownedSection) return res.status(404).json({ message: 'الشعبة غير موجودة' });

  let parsedQuestions = questions;
  if (!Array.isArray(parsedQuestions) && typeof rawQuestions === 'string') {
    parsedQuestions = sanitizeQuestions(rawQuestions);
  }
  if (!Array.isArray(parsedQuestions) || parsedQuestions.some((q) => !q) || parsedQuestions.length === 0) {
    return res.status(400).json({ message: 'صيغة الأسئلة غير صحيحة' });
  }

  const quiz = await QuizTemplate.create({
    instructor: req.user.id,
    section,
    title,
    category,
    algorithm,
    questions: parsedQuestions,
  });

  res.status(201).json({ quiz });
}

async function listQuizzesForAlgorithm(req, res) {
  const enrollments = await SectionEnrollment.find({ student: req.user.id }).select('section');
  const sectionIds = enrollments.map((e) => e.section);

  const quizzes = await QuizTemplate.find({ algorithm: req.params.algorithm, section: { $in: sectionIds } })
    .select('-questions.correctIndex')
    .populate('instructor', 'name');
  res.json({ quizzes });
}

async function listAllQuizzes(req, res) {
  const enrollments = await SectionEnrollment.find({ student: req.user.id }).select('section');
  const sectionIds = enrollments.map((e) => e.section);

  const quizzes = await QuizTemplate.find({ section: { $in: sectionIds } })
    .select('-questions.correctIndex')
    .populate('instructor', 'name')
    .populate('section', 'name')
    .sort({ createdAt: -1 });
  const withNames = quizzes.map((q) => ({ ...q.toObject(), instructorName: q.instructor?.name, sectionName: q.section?.name }));
  res.json({ quizzes: withNames });
}

async function listMyQuizzes(req, res) {
  const quizzes = await QuizTemplate.find({ instructor: req.user.id }).populate('section', 'name').sort({ createdAt: -1 });
  const withStats = await Promise.all(
    quizzes.map(async (q) => {
      const attempts = await QuizAttempt.find({ quiz: q._id }).populate('student', 'name').sort({ createdAt: -1 });
      const avgScore = attempts.length
        ? Math.round((attempts.reduce((s, a) => s + a.score / a.total, 0) / attempts.length) * 100)
        : null;
      const students = attempts.map((a) => ({ name: a.student?.name, score: a.score, total: a.total }));
      return { ...q.toObject(), sectionName: q.section?.name, attemptCount: attempts.length, avgScorePercent: avgScore, students };
    })
  );
  res.json({ quizzes: withStats });
}

async function submitAttempt(req, res) {
  const { answers } = req.body;
  const quiz = await QuizTemplate.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: 'الاختبار غير موجود' });
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({ message: 'عدد الإجابات لا يطابق عدد الأسئلة' });
  }

  let score = 0;
  const results = quiz.questions.map((q, i) => {
    const correct = answers[i] === q.correctIndex;
    if (correct) score += 1;
    return { correct, correctIndex: q.correctIndex };
  });

  await QuizAttempt.create({ quiz: quiz._id, student: req.user.id, score, total: quiz.questions.length });

  res.json({ score, total: quiz.questions.length, results });
}

async function deleteQuiz(req, res) {
  const quiz = await QuizTemplate.findOneAndDelete({ _id: req.params.id, instructor: req.user.id });
  if (!quiz) return res.status(404).json({ message: 'الاختبار غير موجود' });
  await QuizAttempt.deleteMany({ quiz: quiz._id });
  res.json({ message: 'تم حذف الاختبار بنجاح' });
}

module.exports = { createQuiz, listQuizzesForAlgorithm, listAllQuizzes, listMyQuizzes, submitAttempt, deleteQuiz };
