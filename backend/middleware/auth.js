const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'غير مصرح، الرجاء تسجيل الدخول' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'المستخدم غير موجود' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'جلسة غير صالحة، الرجاء تسجيل الدخول من جديد' });
  }
}

function requireInstructor(req, res, next) {
  if (req.user?.role !== 'instructor') {
    return res.status(403).json({ message: 'هذا الإجراء متاح للمدرسين فقط' });
  }
  next();
}

module.exports = { protect, requireInstructor };
