const AccountModel = require('../models/dbaccount')
const AdminModel = require('../models/dbadmin')
const MusicModel = require('../models/dbmusic')
const mongoose = require('mongoose')
const md5 = require('md5')
const response = require('../response')
const session = require('express-session')
const swal = require('sweetalert')


// Admin Login page


//ADMIN page
exports.admin = function(req, res){
    let user = req.session.User
    MusicModel.find({})
    .then(data => {
        console.log(data)
        data.user = user
        
        return res.render('admin.ejs',{data: data})

        
    })
    .catch(err => {
        res.status(500).json('ERROR SERVER')
    })
}


// Function Add Music

exports.add = function(req, res){
    MusicModel.findOne({
        song : req.body.song
    })
    .then(data => {
        if(data){
            res.json(response.responseError('Add error!!!'))
        }else{
            MusicModel.create({
                _id : req.body._id,
                song: req.body.song,
                img : req.body.img ,
                genre : req.body.genre,
                singer : req.body.singer ,
                description : req.body.description 
            })
            res.json(true)
        }
    })
}


// Function EDIT Music 
exports.edit = function(req, res){
    MusicModel.findByIdAndUpdate({_id : req.params.id },
    {
        song: req.body.song,
        img : req.body.img ,
        genre : req.body.genre,
        singer : req.body.singer ,
        description : req.body.description 
    },function(err){
        if(err){
            res.json(response.responseError(err))
        }else{
            res.json(true)
        }
    })
}

// Sever Route editMusic
exports.goEditMusic = async function(req, res){
    try {
        let rs = await MusicModel.findOne({
            _id : req.params.id
        })
        res.render('editMusic.ejs',{data: rs})
    } catch (error) {
        res.json(response.responseError(error))
    }
   
}

// Sever Route addMusic
exports.goAddMusic = function(req, res){
    res.render('addMusic.ejs')
  };


//