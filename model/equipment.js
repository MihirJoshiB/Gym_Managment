const mongoose = require('mongoose');

const equipmentschema = new mongoose.Schema({
    ename : {
        type:String,
        required: [true,'Please add equipment name']
        
    },
    decription : {
        type:String,
        required:[true,'Please add description']
       
    },
    category : {
        type:String,
        required:[true,'Please add category']
        
    },
    qty : {
        type:Number,
        required:[true,'Please add qty']
       
    }
    
});

module.exports = mongoose.model('equipment',equipmentschema);