const { verifyToken } = require('../utils/jwt');

const checkVendorAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || user.role !== 'vendor') {
    return res.redirect('/login');
  }

  // Attach user to request for use in controllers
  req.user = user;
  next();
};

module.exports = { checkVendorAuth };
