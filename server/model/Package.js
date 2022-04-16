const mongoose = require('mongoose');

const packageschema = new mongoose.Schema({
    package_name : {
        type:String,
        required:true,    
    },

    package_details : {
        type:String,
        required:true,
    },

    package_duration : {
        type:String,
        required:true,
        
    },
    package_amount : {
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model('package',packageschema);