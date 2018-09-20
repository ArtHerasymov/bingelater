const mongoose = require('mongoose')
const config = require('../config/database')

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


module.exports.addUser = function(user, callback) {
  user.save(callback)
}
