const express = require('express');
const {login} = require('../controller/multilogin');
const router = express.Router();

router.route('/')
    .post(login)
module.exports = router;