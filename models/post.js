const mongoose = require('mongoose')
const config = require('../config/database')

const PostSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  advisor: {
    type: String,
    required: true,
    default: "Anon"
  }
})
