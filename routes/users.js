const express = require('express')
const router = express.Router()

router.get('/user' , (req, res, next)=>{
  res.json({success:true})
})

module.exports = router
