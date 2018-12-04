var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req,res,next){
  res.render('hello', { title: 'Express' });
})

router.get('/login',function (req,res,next) {
  res.render('login', { title: 'Express' });
});


router.post('/login',function (req,res,next) {
  User.findOne({email:req.body.useremail},function (err,rtn) {
    if(err) throw err;
    if(rtn != null && User.compare(req.body.userpwd,rtn.password)){
      req.session.user = { name: rtn.name, email: rtn.email, id: rtn._id };
      res.redirect('/users/userdetail/'+rtn._id);
    }else {
      res.redirect('/login');
    }
  });
});
router.get('/signup',function (req,res,next) {
  res.render('signup', { title: 'Express' });
});

router.post('/emaildu',function (req,res) {
  console.log(req.body);
  User.findOne({email:req.body.email},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    if(rtn != null){
      res.json({status:false})
    }else {
      res.json({status:true})
    }
  });
})

router.get('/signup2',function (req,res,next) {
  res.render('signup2', { title: 'Express' });
});

router.post('/signup',function (req,res,next) {
  var user = new User();
  user.name = req.body.username;
  user.email = req.body.useremail;
  user.password = req.body.userpwd;
  user.save(function (err,rtn) {
    if(err) throw err;
    res.render('user/user-detail',{user1:rtn,title: 'Express'});
  });
});


module.exports = router;
