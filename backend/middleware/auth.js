exports.verifySuperAdmin = (req, res, next) => {
  if (req.headers['super-admin-key'] !== process.env.SUPER_ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};