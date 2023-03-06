const User = require('../models/user');
const Post = require('../models/Post');
const Follwers = require('../models/Followers');

var Node_session;
module.exports.home = function (req, res) {
    res.send("setup done");
}

//user signup
module.exports.signIn = function (req, res) {
    console.log('body',req.body);
    const user = {
        "name": req.body.name,
        "email": req.body.email,
        "userType": req.body.userType,  
        "pwd": req.body.pwd
    }
    // User.find({ email: req.body.email }, (err, user) => {
    //    if (err) {
    //        res.json({ Message: "Mail Already Exists" });
    //    }
    //})
     User.create({
        ...user
    }, (err) => {
        if (err) {
            console.log("Sorry We Broke Somewhere", err);
            //TODO may be user emial is already there...
            return res.json({ message: "User Already Exists" });
        } else {
            console.log("Done");
            res.json({ message: "Done" });
        }
    })
}

//user login
module.exports.login = function (req, res) {
    console.log(req.body);
    User.find({ email: req.body.email, pwd: req.body.pwd }, (err, user) => {
        if (err) {
            res.status(401).json({ err: err });
        }
        if (user.length == 0) {
            res.json({ message: "Wrong Email/Password" });

        } else {
            Node_session = req.session;
            Node_session.userId = user[0]._id;
            console.log(req.session);
            res.send({
                message: "User Logged in",
                userId: user[0]._id,
                name: user[0].email
            });
        }

    });
}

// logout 
module.exports.logout = function (req, res) {
    req.session.destroy();
    console.log('destroyed',req.session)
    return res.send('destroyed session')

   
}

//add posts
module.exports.addPost = function (req, res, next) {
    console.log(req.session);
    if (req.body.Postedby === '' || typeof req.body.Postedby === 'undefined') {
        return res.status(401).json({ Message: "User Not Logged In" });
    }
    const body = {
        Postedby: req.body.Postedby,
        imgSrc: req.body.imgSrc,
        desc: req.body.desc,
        likes: 0,
        title: req.body.title
    }
    console.log(body);
    Post.create({
        ...body
    }, (err) => {
        if (err) {
            res.json({ message: 'Sorry Try After Sometime' })
        } else {
            res.json({ message: 'Post Created' });
        }
    })
    
}

//get All posts posted by a user by userID
module.exports.getPostsById = function (req, res) {
   // console.log(req.params)
    Post.find({ Postedby: req.params.id }, (err, posts) => {
        if (err) {
            return res.json({ err: 'Please Try After Sometime' });
        }
        return res.json({ message: posts });
    })
}

//get all artists : for now all useres
module.exports.getAllArtists = function (req, res) {



    User.find({ }, '-pwd -__v', (err, users) => {
        if (err) {
            return res.json({
                message: false,
            });
        }
        if (users.length > 0) {
           
            res.json({
                message: true,
                users: users
            });

        }
    })
}

//get all casters
module.exports.getAllCasts = function (req, res) {
    User.find({ userType: 'cast' }, '-pwd -__v', (err, users) => {
        if (err) {
            return res.json({
                message: false,
            });
        }
        if (users.length > 0) {

            res.json({
                message: true,
                users: users
            });

        }
    })
}


// add follow and follower
module.exports.addFollow =  function (req, res) {
    Follwers.findOneAndUpdate(
        { userId: req.body.userId },
        { $addToSet: { following: req.body.id } },
        { upsert: true, new: true },
        (err) => {
            console.log('ing',err);
        }
        
        
    );

    Follwers.updateOne(
        { userId: req.body.id },
        { $addToSet: { followers: req.body.userId } },
        { upsert: true, new: true },
        (err) => {
            console.log('er', err);
        }
       
    );


    return res.json({
        message: true
    })
}

//get all contacts of a user by id
module.exports.getContacts = function (req, res) {
    Follwers.find({ userId: req.body.userId }, { followers: true, following: true },
        (err, users) => {
            if (err) {
                return res.json({
                    message: false
                })
            }
            res.json({
                message: true,
                contacts: users
            });
        }
    ).populate('following followers', '-pwd -__v')
}