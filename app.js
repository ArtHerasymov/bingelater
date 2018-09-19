const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const users = require('./routes/users')

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin" , "*")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})


app.use('/users' , users)

const port = 3000

app.listen(port, () => {
  console.log("Server started on port " + port)
})
