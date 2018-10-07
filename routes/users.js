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

router.get('/profile',passport.authenticate('jwt', { session: false }), (req, res, next) =>{
  res.json({user: req.user})
} )


router.post('/authenticate', (req, res, next) => {

  console.log(req.body)

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

router.get('/getRecommendations/:user', (req, res, next) => {
  Post.getPosts(req.params.user, (err, posts) => {
    if(err) res.json({success:false})
    else{
      res.json({success:true ,posts: posts})
    }
  })
})

router.post('/addRecommendation' ,  (req, res, next) => {
  let post = new Post({
    author: req.body.author,
    body: req.body.body,
    cover: req.body.cover,
    advisor: req.body.advisor
  })
  Post.addPost(post, (err, post) => {
    if(err) res.json({success:false})
    else res.json({success: true, post:post})
  })
})

router.get('/getAll' , (req, res, next) => {
  Post.getAllPosts((err, posts) => {
    if(err) res.json({success: false})
    else res.json({success: true, posts:posts})
  })
})

router.get('/getByAdvisor/:advisor', (req, res, next) => {
  Post.getPostsByAdvisor(req.params.advisor, (err, posts) => {
    if(err) res.json({success: false, message : err})
    else res.json({success: true, posts: posts})
  })
})

router.get('/updateStatus/:id', (req, res, next) => {
  Post.updateStatus(req.params.id , (err, posts) => {
    if(err) res.json({success:false, msg: err})
    else res.json({success:true})
  })
})

router.get('/removeById/:id', (req, res, next) => {
  Post.removePost(req.params.id, (err, posts) => {
    if(err) res.json({success:false, message: err})
    else res.json({success:true, id: req.params.id})
  })
})

module.exports = router
