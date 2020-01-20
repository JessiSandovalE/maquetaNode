var jwt = require('jsonwebtoken');

function auth(req, res, next) {

  let jwtToken = req.header('Authorization');
  if (!jwtToken) return res.status(401).json({ err: 'Token not found' });

  try {
    let payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_API);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json('Invalid token');
  }

}

module.exports = auth;