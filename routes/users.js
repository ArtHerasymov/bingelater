const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/register' , (req, res, next)=>{
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  User.addUser(newUser , (err, user) => {
    if(err) res.json({success:false , msg:err})
    else res.json({success:true, msg:"User has been registered"})
  })
})

router.post('/login' , (req, res, next) => {
  let candidateUser = new User({
    username : req.body.username,
    password: req.body.password
  })

})


module.exports = router
