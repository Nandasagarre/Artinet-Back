const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    userType: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required:true
    },
  
})


const User = mongoose.model('User', user);

module.exports = User;
