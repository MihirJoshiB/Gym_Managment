const express = require('express');
const {
    gettrainers,
    gettrainer,
    addtrainer,
    updatetrainer,
    deletetrainer} = require('../controller/trainer_controller');

    const router = express.Router();

    router.route('/')
    .get(gettrainers)
    .post(addtrainer);

    router.route('/:id')
    .get(gettrainer)
    .put(updatetrainer)
    .delete(deletetrainer);
   


module.exports = router;