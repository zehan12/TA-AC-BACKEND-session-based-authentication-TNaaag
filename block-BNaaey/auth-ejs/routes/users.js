var express = require('express');
var router = express.Router();
var User = require('../models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.send('respond with a resource');
});

router.get('/register',(req,res,next)=>{
  res.render('register');
})

router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,user)=>{
    if (err) return next(err);
    res.redirect('/');
  })
})

router.get('/login',(req,res,next)=>{
  res.render('login');
})

router.post('/login',(req,res,next)=>{
  var { email, password } = req.body;
  console.log(email,password)
  if ( !email || !password ){
    res.redirect('/users/login')
  }
  User.findOne({email},(err,user)=>{
    if (err) next(err);
    //No User
    if(!user){
        return res.redirect('/users/login')
    }
    //user & Compare password
    user.verifyPassword(password,(err,result)=>{
      console.log(err,result);
      if (err) return next(err);
      if(!result){
        return res.redirect('/users/login');
      }
      // persist logged in user information
      req.session.userId = user.id;
      res.redirect("/users");
    })
  })
})



module.exports = router;
