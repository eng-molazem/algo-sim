function notFound(req, res, next) {
  res.status(404).json({ message: `المسار غير موجود: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || 'حدث خطأ في الخادم',
  });
}

module.exports = { notFound, errorHandler };
