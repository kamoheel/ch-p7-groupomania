const express = require('express');
const router = express.Router()

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

//save sauces to database
router.post('/', auth, multer, postCtrl.createPost);
//get list of posts
router.get('/', auth, postCtrl.getAllPosts);
//get one specific post
//router.get('/:id', auth, postCtrl.getOnePost);
//Modify a post
router.put('/:id', auth, multer, postCtrl.modifyPost);
//Delete a post
router.delete('/:id', auth, postCtrl.deletePost);
//Like or Dislike a post
router.post('/:id/like', auth, postCtrl.likeDislikePost);

module.exports = router;