const User = require('../models/User');
const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const SectionEnrollment = require('../models/SectionEnrollment');
const generateToken = require('../utils/generateToken');

async function register(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'الاسم والبريد الإلكتروني وكلمة المرور مطلوبة' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'البريد الإلكتروني مستخدم مسبقاً' });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role === 'instructor' ? 'instructor' : 'student',
  });

  res.status(201).json({
    user: user.toSafeObject(),
    token: generateToken(user._id),
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }

  res.json({
    user: user.toSafeObject(),
    token: generateToken(user._id),
  });
}

async function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

async function updateProfile(req, res) {
  const { name, preferredLanguage, instructorModeEnabled, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (name) user.name = name;
  if (preferredLanguage) user.preferredLanguage = preferredLanguage;
  if (typeof instructorModeEnabled === 'boolean') user.instructorModeEnabled = instructorModeEnabled;

  if (newPassword) {
    if (!currentPassword || !(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'كلمة المرور الحالية غير صحيحة' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل' });
    }
    user.password = newPassword;
  }

  await user.save();
  res.json({ user: user.toSafeObject() });
}

async function markAlgorithmComplete(req, res) {
  const { algorithmKey } = req.body;
  if (!algorithmKey) {
    return res.status(400).json({ message: 'algorithmKey مطلوب' });
  }

  const user = await User.findById(req.user.id);
  if (!user.completedAlgorithms.includes(algorithmKey)) {
    user.completedAlgorithms.push(algorithmKey);
    await user.save();
  }

  const enrollments = await SectionEnrollment.find({ student: user._id }).select('section');
  const sectionIds = enrollments.map((e) => e.section);
  const matchingAssignments = await Assignment.find({ algorithm: algorithmKey, section: { $in: sectionIds } });
  await Promise.all(
    matchingAssignments.map((assignment) =>
      AssignmentSubmission.updateOne(
        { assignment: assignment._id, student: user._id },
        { $setOnInsert: { assignment: assignment._id, student: user._id } },
        { upsert: true }
      )
    )
  );

  res.json({ completedAlgorithms: user.completedAlgorithms });
}

module.exports = { register, login, getMe, updateProfile, markAlgorithmComplete };
