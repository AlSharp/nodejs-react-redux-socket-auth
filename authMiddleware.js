const jwt = require('jsonwebtoken');

module.exports = secret => (req, res, next) => {
  console.log('auth middleware');
  const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    console.log('no token');
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    })
  }
}