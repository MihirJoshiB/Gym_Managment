const mongoose = require('mongoose');

const equipmentschema = new mongoose.Schema({
    eqname : {
        type:String,
        required: [true,'Please add equipment name']
        
    },
    eqdescription : {
        type:String,
        required:[true,'Please add description']
       
    },
    eqcategory : {
        type:String,
        required:[true,'Please add category']
        
    },
    eqquantity : {
        type:Number,
        required:[true,'Please add qty']
       
    }
    
});

module.exports = mongoose.model('equipment',equipmentschema);