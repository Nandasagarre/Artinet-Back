const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;

const post = new Schema({
    Postedby: {
        type: String,
        required:true
    },
    imgSrc: {
        type: String,
    },
    desc: {
        type: String,
        /*required:true*/
    },
    likes: {
        type: Number,

    },
    title: {
        type:String
        }
})


const Post = mongoose.model('Post', post);

module.exports = Post;
