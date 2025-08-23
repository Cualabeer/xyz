export function verifySuperAdmin(req, res, next) {
  const key = req.headers['super-admin-key'];
  if (!key || key !== process.env.SUPER_ADMIN_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid Super Admin Key' });
  }
  next();
}