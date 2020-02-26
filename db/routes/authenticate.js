const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app, secret) => {
  app.post('/api/user/authenticate', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
      .then(user => {
        if (!user) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            })
        } else {
          user.isCorrectPassword(password)
            .then(result => {
              if (!result) {
                res.status(401)
                  .json({
                    error: 'Incorrect email or password'
                  })
              } else {
                const token = jwt.sign({email}, secret, {
                  expiresIn: '1h'
                });
                res.cookie('token', token, {httpOnly: true}).sendStatus(200);
              }
            })
        }
      })
  })
}