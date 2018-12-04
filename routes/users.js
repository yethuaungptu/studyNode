var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function (req,res,next) {
  User.find({},function (err,rtn) {
    if(err) throw err;
    res.render('user/user-list',{user:rtn});
  });
});

router.get('/update/:id', function (req,res,next) {
  User.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.render('user/user-update',{title:"express",user:rtn});
  });

});

router.post('/update',function (req,res) {
  var update = {
    name:req.body.username,
    email:req.body.useremail,
    password: req.body.userpwd
  }
  User.findByIdAndUpdate(req.body.id,{$set: update},function (err,rtn) {
    if(err) throw err;
    res.redirect('/users/userdetail/'+rtn._id);
  })
})

router.get('/delete/:id', function (req,res) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  });
});

router.get('/userdetail/:id', function (req,res,next) {
  User.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(req.session.user);
    res.render('user/user-detail',{user1:rtn,title: 'Express'});
  });
});

module.exports = router;
