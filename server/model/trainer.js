const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const trainerSchema = new mongoose.Schema({
  Trainer_Name: {
    type: String,
    required: true,
  },
  Trainer_Image: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    maxlength: [10, 'Add valid phone number'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Height: {
    type: Number,
    required: true,
  },
  Wight: {
    type: Number,
    required: true,
  },

  Speciality: {
    type: String,
    required: true,
  },
  Experience: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
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