const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MusicSchema = new Schema({
    _id: {type : String},
    song: String,
    img: String,
    genre: String,
    singer: String,
    description: String
}, {
    collection: 'music'
})

const MusicModel = mongoose.model('music', MusicSchema)

module.exports = MusicModel
