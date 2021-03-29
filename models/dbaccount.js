const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    // isAdmin: Boolean,
    // isUser: Boolean

}, {
    collection: 'account'
})

const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel