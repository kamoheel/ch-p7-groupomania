const express = require('express');
const router = express.Router()

const { requireAuth } = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

//add a comment
router.post('/', requireAuth, commentCtrl.createComment);
//fetchAllComments
router.get('/', requireAuth, commentCtrl.getAllComments);
//getCommentsforOnePost
router.get('/:id', requireAuth, commentCtrl.getCommentsForOnePost);
//deleteOneComment
router.delete('/:id/', requireAuth, commentCtrl.deleteComment);
//modifyComment
router.put('/:id/', requireAuth, commentCtrl.modifyComment);

module.exports = router;