const mongoose = require('mongoose');

const Batchschema = new mongoose.Schema({
    batch_name:{
        type:String,
        required:true,
    },

    batch_start_time:{
        type:String,
        required:true,
    },

    batch_end_time:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Batch',Batchschema);