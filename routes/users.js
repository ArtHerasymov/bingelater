const express = require('express')
const router = express.Router()

router.get('/register' , (req, res, next)=>{
  console.log('success')
  res.json({success:true})
})


module.exports = router
