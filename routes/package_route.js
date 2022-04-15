const express = require('express');
const {
    getPackages,
    getPackage,
    addpackage,
    updatepackage,
    deletepackage} = require('../controller/package_controller');

    const router = express.Router();

    router.route('/')
    .get(getPackages)
    .post(addpackage);

    router.route('/:id')
    .get(getPackage)
    .put(updatepackage)
    .delete(deletepackage);
    // router.route('/')
    // .get(getBootcamps)
    // .post(createBootcamps);

    // router.route('/:id')
    // .get(getBootcamp)
    // .put(updateBootcamps)
    // .delete(deleteBootcamps);




module.exports = router;