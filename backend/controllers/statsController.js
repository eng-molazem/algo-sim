const User = require('../models/User');
const Section = require('../models/Section');
const SectionEnrollment = require('../models/SectionEnrollment');

async function getOverview(req, res) {
  const mySections = await Section.find({ instructor: req.user.id }).select('_id');
  const sectionIds = mySections.map((s) => s._id);
  const enrollments = await SectionEnrollment.find({ section: { $in: sectionIds } }).select('student');
  const studentIds = [...new Set(enrollments.map((e) => e.student.toString()))];

  const students = await User.find({ _id: { $in: studentIds } }).select('completedAlgorithms');

  const totalStudents = students.length;
  const totalCompletions = students.reduce((sum, s) => sum + s.completedAlgorithms.length, 0);
  const averageCompleted = totalStudents ? totalCompletions / totalStudents : 0;

  const counts = {};
  students.forEach((s) => {
    s.completedAlgorithms.forEach((key) => {
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  const topAlgorithms = Object.entries(counts)
    .map(([algorithm, completedByCount]) => ({ algorithm, completedByCount }))
    .sort((a, b) => b.completedByCount - a.completedByCount)
    .slice(0, 8);

  res.json({
    totalStudents,
    averageCompleted: Math.round(averageCompleted * 10) / 10,
    topAlgorithms,
  });
}

module.exports = { getOverview };
