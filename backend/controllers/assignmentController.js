const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const Section = require('../models/Section');
const SectionEnrollment = require('../models/SectionEnrollment');

async function createAssignment(req, res) {
  const { title, category, algorithm, dueDate, section } = req.body;
  if (!title || !category || !algorithm || !section) {
    return res.status(400).json({ message: 'عنوان الواجب والفئة والخوارزمية والشعبة مطلوبة' });
  }

  const ownedSection = await Section.findOne({ _id: section, instructor: req.user.id });
  if (!ownedSection) return res.status(404).json({ message: 'الشعبة غير موجودة' });

  const assignment = await Assignment.create({
    instructor: req.user.id,
    section,
    title,
    category,
    algorithm,
    dueDate: dueDate || null,
  });

  res.status(201).json({ assignment });
}

async function listAssignments(req, res) {
  if (req.user.role === 'instructor') {
    const assignments = await Assignment.find({ instructor: req.user.id }).populate('section', 'name').sort({ createdAt: -1 });
    const withCounts = await Promise.all(
      assignments.map(async (a) => {
        const submissions = await AssignmentSubmission.find({ assignment: a._id }).populate('student', 'name');
        const students = submissions.map((s) => s.student?.name).filter(Boolean);
        return { ...a.toObject(), sectionName: a.section?.name, submissionCount: students.length, students };
      })
    );
    return res.json({ assignments: withCounts });
  }

  const enrollments = await SectionEnrollment.find({ student: req.user.id }).select('section');
  const sectionIds = enrollments.map((e) => e.section);

  const assignments = await Assignment.find({ section: { $in: sectionIds } })
    .populate('instructor', 'name')
    .populate('section', 'name')
    .sort({ createdAt: -1 });
  const submissions = await AssignmentSubmission.find({ student: req.user.id });
  const submittedIds = new Set(submissions.map((s) => s.assignment.toString()));
  const withStatus = assignments.map((a) => ({
    ...a.toObject(),
    instructorName: a.instructor?.name,
    sectionName: a.section?.name,
    completed: submittedIds.has(a._id.toString()),
  }));
  res.json({ assignments: withStatus });
}

async function deleteAssignment(req, res) {
  const assignment = await Assignment.findOneAndDelete({ _id: req.params.id, instructor: req.user.id });
  if (!assignment) return res.status(404).json({ message: 'الواجب غير موجود' });
  await AssignmentSubmission.deleteMany({ assignment: assignment._id });
  res.json({ message: 'تم حذف الواجب بنجاح' });
}

module.exports = { createAssignment, listAssignments, deleteAssignment };
