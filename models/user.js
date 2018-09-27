const mongoose = require('mongoose')
const config = require('../config/database')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  posts:{
    type: Array,
    default: []
  },
})

const User = module.exports = mongoose.model('User', UserSchema)


module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err ,salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback) {
  User.findOne({username: username} , callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err
    callback(null, isMatch)
  })
}
