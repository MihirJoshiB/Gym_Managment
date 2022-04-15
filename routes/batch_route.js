const express = require('express');

const{ getBatches,
    getbatch,
    addbatch,
    updatebatch,
    deletebatch} = require('../controller/batch_controller');

const router = express.Router();

router.route('/')
    .post(addbatch)
    .get(getBatches);

router.route('/:id')
    .get(getbatch)
    .put(updatebatch)
    .delete(deletebatch);
   

    module.exports = router;