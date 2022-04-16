const express = require('express');

const { register,login,member_register,member_login} = require('../controller/auth_contrller');
const router = express.Router();
router.route('/register')
    .post(register)

router.route('/login')
    .post(login)
    
router.route('/member_register')
    .post(member_register)

router.route('/member_login')
    .post(member_login)
module.exports = router; 