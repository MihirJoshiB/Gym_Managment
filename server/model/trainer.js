const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const trainerSchema = new mongoose.Schema({
  trainername: {
    type: String,
    required: true,
  },
  traineremail: {
    type: String,
    required: true,
    //unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add valid email',
    ],
  },
  // Trainer_Image: {
  //   type: String,
  //   required: true,
  // },
  
  trainerdob: {
    type: Date,
    required: true,
  },
  trainercontactno: {
    type: Number,
    required: true,
    maxlength: [10, 'Add valid phone number'],
    //unique: true,
  },
  traineraddress: {
    type: String,
    required: true,
  },
  trainergender: {
    type: String,
    required: true,
  },
  
  trainerheight: {
    type: Number,
    required: true,
  },
  trainerweight: {
    type: Number,
    required: true,
  },
  trainerrdate: {
    type: Date,
    default: Date.now,
  },
  trainerexp: {
    type: Number,
    required: true,
  },
  trainerbatch:{
    type: String,
    required:true
  },
  trainerspeciality: {
    type: String,
    required: true,
  },
  trainerpassword: {
    type: String,
    required: true,
    select: false,
  },
  role:{
    type:String,
    default:"T",
  } 
});

//encrypt password
trainerSchema.pre("save",async function (next){
    console.log("save updating");
    if(!this.isModified('password')){ next();}
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
});

//sign JWT and return
trainerSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id},process.env.JWT_SERECT,{
  expiresIn: process.env.JWT_EXPIRE
  })
}

//match password to hash password in database
trainerSchema.methods.matchPassword = async function(enterpassword)
{
  return await bcrypt.compare(enterpassword,this.password);
}
module.exports = mongoose.model('Trainer', trainerSchema);
