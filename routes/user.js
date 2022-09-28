const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limit = require('../middleware/rate-limit');


router.post('/signup', userCtrl.signup);
router.post('/login', limit.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);


module.exports = router;