const express = require('express');
const {
    getmembers,
    getmember,
    addmember,
    updatemember,
    deletememebr} = require('../controller/member_controller');

    const router = express.Router();
    const { protect } = require('../middleware/auth');
    router.route('/')
    .get(getmembers)
    .post(addmember);

    router.route('/:id')
    .get(getmember)
    .put(updatemember)
    .delete(deletememebr);
   


module.exports = router;