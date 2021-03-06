const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const mongoose = require('mongoose')
const config = require('./config/database')
const cors = require('cors')
const passport = require('passport')

mongoose.connect(config.database)

mongoose.connection.on('connected' , () => {
  console.log('Connected to database' + config.database)
})

mongoose.connection.on('error' , () => {
  console.log('Database error : ' + err)
})

const app = express()
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin" , "*")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use('/users' , users)

const port = 3001

app.listen(port, () => {
  console.log("Server started on port " + port)
})
