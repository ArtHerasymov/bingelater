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
