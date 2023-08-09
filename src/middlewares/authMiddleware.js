import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'Authentication failed' });
  }

  try {
    const { name, id, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name, id, role };
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { authenticateUser };
