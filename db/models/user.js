const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds)
      .then(hash => {
        document.password = hash;
        next();
      })
      .catch(error => {
        next(error);
      })
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

module.exports = mongoose.model('User', UserSchema);