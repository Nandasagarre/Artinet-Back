const express = require('express');
const router = express.Router();
const homeC = require('../controllers/C_index');
const upload = require('../config/multer');


router.get('/', homeC.home);
router.get('/userposts/:id', homeC.getPostsById);
router.get('/logout', homeC.logout);
router.get('/getallartists', homeC.getAllArtists);
router.get('./getallcasters',homeC.getAllCasts);

router.post('/signin', homeC.signIn);
router.post('/login', homeC.login);
router.post('/addpost', upload.single('post'), homeC.addPost);
router.post('/addfollow', homeC.addFollow);
router.post('/getcontacts', homeC.getContacts);
module.exports = router;