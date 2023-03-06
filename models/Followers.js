const mongoose = require('mongoose');
const { Schema } = mongoose;
//import User from './User';
const followers = new Schema({
    userId: {
        type: String,
        require: true
    },
    followers: {
        type: [{ type: Schema.ObjectId, ref:'User' }],
    },
    following: {
        type: [{ type: Schema.ObjectId, ref: 'User' }],
        }
});

const Followers = mongoose.model('followers', followers);
module.exports = Followers;