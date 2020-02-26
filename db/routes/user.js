const User = require('../models/user');

module.exports = app => {
  app.post('/api/user/register', (req, res) => {
    const {email, password} = req.body;
    const user = new User({email, password})
      .save()
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      })
  });
}