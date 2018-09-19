const mongoose = require('mongoose')
const config = require('../config/database')

const AdvisorSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  posts:{
    type: Array,
    default: []
  },
})
