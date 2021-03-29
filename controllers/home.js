
const session = require('express-session')
const AccountModel = require('../models/dbaccount')
const MusicModel = require('../models/dbmusic')
const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID;


// Home page
exports.index = function(req, res){
    let user = req.session.User
    MusicModel.find({})
    .then(data => {
        data.user = user
        return res.render('index.ejs',{data: data})
    })
    .catch(err => {
        res.status(500).json('ERROR SERVER')
    })
};


 // Route musicDetail
 exports.goDetail = function(req, res){
    let user = req.session.User
    MusicModel.findOne({
        _id : req.params.id
    })
    
    .then(data => {
        data.user = user
        return res.render('musicDetail.ejs',{data: data})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json('ERROR SERVER')
    })
  };