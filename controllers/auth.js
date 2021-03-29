const AccountModel = require('../models/dbaccount')
const AdminModel = require('../models/dbadmin')
const MusicModel = require('../models/dbmusic')
const mongoose = require('mongoose')
const md5 = require('md5')
const response = require('../response')

// Function Login
exports.login = function(req, res){
    const username = req.body.username
    const password = md5(req.body.password)
    AccountModel.findOne({
        username: username,
        password: password
    })
    
        .then(data => {
            if (data) {
                req.session.User = data              
                res.redirect(`/userLogin/${data.id}`)
            } else {
                res.json(response.responseError('Login failed'))
            }
        })
        .catch(err => {
            res.json(response.responseError('Error from server'))
        })
  };


  // Function Register
  exports.register = function(req, res){
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username
    })
    .then(data => {
        if (data) {
            res.json(response.responseError('username was existed'))
        } else {
            return AccountModel.create({
                username: username,
                password: md5(password)
            })
        }
    })
    .then(data => {
        res.redirect('/login')
    })
    .catch(err => {
        res.json(response.responseError('Create account failed'))
    })
  }


  //Function logout

  exports.logout = function(req, res){
    if (req.session.User && req.cookies.kim) {
      res.clearCookie('kim');
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  };

  //


  // Route login
  exports.goLogin = function(req, res){
    res.render('login.ejs')
  };



  exports.goUserLogin = async function(req, res){
    //find all music => gán vào data
    let data = await MusicModel.find({})
    // khi user login sẽ có session, gán session vào data.user để check (in line 24 of userLogin.ejs)
    data.user = req.session.User
    // khi render ra 1 trang hoạt động theo phương thức get cần truyền thêm data 
    res.render('userLogin.ejs',{data: data})
  };

  // Route register
  exports.goRegister = function(req, res){
    res.render('register.ejs')
  };

 