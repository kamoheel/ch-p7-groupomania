const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limit = require('../middleware/rate-limit');
const { requireAuth } = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login', limit.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/:id', requireAuth, userCtrl.getOneUser);
router.put('/:id', requireAuth, multer, userCtrl.modifyUserProfile);


module.exports = router;