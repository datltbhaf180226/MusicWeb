const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username: String,
    password: String,
    isAdmin: Boolean

}, {
    collection: 'admin'
})

const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel