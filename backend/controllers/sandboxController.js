const SandboxAttempt = require('../models/SandboxAttempt');

async function submitAttempt(req, res) {
  const { algorithm, timeMs, isCorrect } = req.body;
  if (!algorithm || typeof timeMs !== 'number' || typeof isCorrect !== 'boolean') {
    return res.status(400).json({ message: 'بيانات المحاولة غير مكتملة' });
  }

  const attempt = await SandboxAttempt.create({
    user: req.user.id,
    algorithm,
    timeMs,
    isCorrect,
  });

  res.status(201).json({ attempt });
}

async function getLeaderboard(req, res) {
  const { algorithm } = req.params;

  const leaderboard = await SandboxAttempt.aggregate([
    { $match: { algorithm, isCorrect: true } },
    { $sort: { timeMs: 1 } },
    { $group: { _id: '$user', bestTimeMs: { $first: '$timeMs' }, achievedAt: { $first: '$createdAt' } } },
    { $sort: { bestTimeMs: 1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: '$user.name',
        bestTimeMs: 1,
        achievedAt: 1,
      },
    },
  ]);

  res.json({ leaderboard });
}

module.exports = { submitAttempt, getLeaderboard };
