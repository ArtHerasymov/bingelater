const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const passport = require('passport')

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

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err
    if(!user) return res.json({success:false, msg: 'User not found'})

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        })
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username,
            posts: user.posts
        }
      })
    } else {
      return res.json({success:true, msg: 'Wrong password'})
    }
    })
  })
})

router.post('/login' , (req, res, next) => {
  let candidateUser = new User({
    username : req.body.username,
    password: req.body.password
  })
})

router.get('/getRecommendations/:user', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Post.getPosts(req.params.id, (err, posts) => {
    if(err) res.json({success:false})
    else res.json({success:true, posts: posts})
  })
})

module.exports = router
