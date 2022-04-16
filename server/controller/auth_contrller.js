
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const trainer = require('../model/trainer');
const member = require('../model/member_reg');
const { options } = require('../routes/auth');

//regiser of trainer
exports.register = asyncHandler( async (req , res , next) => {

    const{Trainer_Name,Trainer_Image,Gender,Address,phone,email,password,DOB,Height,Wight,Speciality,Experience} = req.body;
   
    const user = await trainer.create({
        Trainer_Name,Trainer_Image,Gender,Address,phone,email,password,DOB,Height,Wight,Speciality,Experience
    })

    sendTokenResponse(user,200,res);
  
});
//register of member
exports.member_register = asyncHandler( async (req , res , next) => {

    const{member_Name,member_Image,Gender,Address,phone,email,password,DOB,Height,Wight} = req.body;
   
    const user = await member.create({
        member_Name,member_Image,Gender,Address,phone,email,password,DOB,Height,Wight
    })

    sendTokenResponse(user,200,res);
  
});

//login
exports.login = asyncHandler( async (req , res , next) => {

    const{email , password} = req.body;
   
   //validate  email & password
   if(!email || !password)
   {
       return next(new ErrorResponse('Please provide an email and password',400));
   }

   //check for user
   const user = await trainer.findOne({ email }).select('+password');

   if(!user)
   {
    return next(new ErrorResponse('Invalid Email or user id',401));
   }
   //check password match
   const ismatch = await user.matchPassword(password);
   
   if(!ismatch)
   {
    return next(new ErrorResponse('Invalid Password',401));
   }
         sendTokenResponse(user,200,res);

});

//login member
exports.member_login = asyncHandler( async (req , res , next) => {

    const{email , password} = req.body;
   
   //validate  email & password
   if(!email || !password)
   {
       return next(new ErrorResponse('Please provide an email and password',400));
   }

   //check for user
   const user = await member.findOne({ email }).select('+password');

   if(!user)
   {
    return next(new ErrorResponse('Invalid Email or user id',401));
   }
   //check password match
   const ismatch = await user.matchPassword(password);
   
   if(!ismatch)
   {
    return next(new ErrorResponse('Invalid Password',401));
   }
         sendTokenResponse(user,200,res);

});

//Get token and create cookie and send resp\onse
const sendTokenResponse = (user , StatusCode, res) => {
    const token = user.getSignedJwtToken();

    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
        httpOnly:true
    };

    // if(process.env.NODE_ENV === 'devlopment')
    // {
    //    // options.secure = true;
    // }

    res
    .status(StatusCode)
    .cookie('token', token , option)
    .json({
        success:true,
        token
    });
}