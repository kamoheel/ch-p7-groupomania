const express = require('express');
const router = express.Router()

const { requireAuth } = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

//save posts to database
router.post('/', requireAuth, multer, postCtrl.createPost);
//get list of posts
router.get('/', requireAuth, postCtrl.getAllPosts);
//get one specific post
//router.get('/:id', auth, postCtrl.getOnePost);
//Modify a post
router.put('/:id', requireAuth, multer, postCtrl.modifyPost);
//Delete a post
router.delete('/:id', requireAuth, postCtrl.deletePost);
//Like or Dislike a post
router.post('/:id/like', requireAuth, postCtrl.likeDislikePost);

module.exports = router;