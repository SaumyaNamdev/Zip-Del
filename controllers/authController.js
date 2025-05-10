const { generateToken } = require('../utils/jwt');

// After user credentials are verified
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = generateToken(user);

  // Send token in cookie (HTTP-only recommended)
  res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });

  if (user.role === 'vendor') {
    return res.redirect('/vendor/dashboard');
  } else {
    return res.redirect('/');
  }
};
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login'); // or redirect to homepage if you prefer
  };
  
  module.exports = {
    loginUser, // existing
    logoutUser, // new
  };
  