const Section = require('../models/Section');
const SectionEnrollment = require('../models/SectionEnrollment');
const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const QuizTemplate = require('../models/QuizTemplate');
const QuizAttempt = require('../models/QuizAttempt');

async function createSection(req, res) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'اسم الشعبة مطلوب' });
  }

  const section = await Section.create({ name: name.trim(), instructor: req.user.id });
  res.status(201).json({ section });
}

async function listMySections(req, res) {
  const sections = await Section.find({ instructor: req.user.id }).sort({ createdAt: -1 });
  const withCounts = await Promise.all(
    sections.map(async (s) => {
      const studentCount = await SectionEnrollment.countDocuments({ section: s._id });
      return { ...s.toObject(), studentCount };
    })
  );
  res.json({ sections: withCounts });
}

async function listJoinedSections(req, res) {
  const enrollments = await SectionEnrollment.find({ student: req.user.id }).populate({
    path: 'section',
    populate: { path: 'instructor', select: 'name' },
  });
  const sections = enrollments
    .filter((e) => e.section)
    .map((e) => ({ ...e.section.toObject(), instructorName: e.section.instructor?.name }));
  res.json({ sections });
}

async function joinSection(req, res) {
  const { joinCode } = req.body;
  if (!joinCode || !joinCode.trim()) {
    return res.status(400).json({ message: 'رمز الانضمام مطلوب' });
  }

  const section = await Section.findOne({ joinCode: joinCode.trim().toUpperCase() });
  if (!section) return res.status(404).json({ message: 'رمز الانضمام غير صحيح' });

  await SectionEnrollment.updateOne(
    { section: section._id, student: req.user.id },
    { $setOnInsert: { section: section._id, student: req.user.id } },
    { upsert: true }
  );

  res.json({ section });
}

async function deleteSection(req, res) {
  const section = await Section.findOneAndDelete({ _id: req.params.id, instructor: req.user.id });
  if (!section) return res.status(404).json({ message: 'الشعبة غير موجودة' });

  const assignments = await Assignment.find({ section: section._id }).select('_id');
  await AssignmentSubmission.deleteMany({ assignment: { $in: assignments.map((a) => a._id) } });
  await Assignment.deleteMany({ section: section._id });

  const quizzes = await QuizTemplate.find({ section: section._id }).select('_id');
  await QuizAttempt.deleteMany({ quiz: { $in: quizzes.map((q) => q._id) } });
  await QuizTemplate.deleteMany({ section: section._id });

  await SectionEnrollment.deleteMany({ section: section._id });

  res.json({ message: 'تم حذف الشعبة بنجاح' });
}

module.exports = { createSection, listMySections, listJoinedSections, joinSection, deleteSection };
