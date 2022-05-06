const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
//const trainer = require('../model/trainer');
const member = require('../model/member_reg');
const { options } = require('../routes/auth');
const trainer = require('../model/trainer');

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let trainers
  
    // Validate email and password
    if (!email) {
      return next(new ErrorResponse('Please Provide Email', 400));
    }
  
    if (!password) {
      return next(new ErrorResponse('Please Provide Password', 400));
    }
  
    if (email === 'admin@gmail.com' && password === 'admin123') {
      res.status(200).json({ success: true, msg: 'Admin login done' });
    }
    // Check for user
    const members = await member.findOne({ email }).select('+password');
    if(!members){
      trainers = await trainer.findOne({ email }).select('+password');
      if(!trainers){
        return next(new ErrorResponse('Invalid credentials',401));
      }
        //check if password matches
      const match1 = await trainers.matchPassword(password);
      if(!match1){
        return next(new ErrorResponse('Invalid credentials',400));
      }else{
        sendTokenResponse(trainers,200,res,trainers.role);
      }
    }
    //check if password matches
    const match = await members.matchPassword(password);
    if(!match){
      return next(new ErrorResponse('Invalid credentials',400));
    }else{
      sendTokenResponse(members,200,res,members.role);
    }
    // if (!members) {
    //   const trainers = await trainer.findOne({ email }).select('+password');
    //   if (!trainers) {
    //     return next(new ErrorResponse('Invalid credentials', 401));
    //   }
  
    //   // Check if password matches

    //   trainer.matchPassword = async function(enterpassword)
    //   {
    //     return await bcrypt.compare(enterpassword,this.password);

    //   }
    // //  const match1 = await trainer.matchPassword(password);
      
    //   if (!trainers) {
    //    // return next(new ErrorResponse('Invalid credentials', 400));
    //     member.matchPassword = async function(enterpassword)
    //     {
    //       return await bcrypt.compare(enterpassword,this.password);
    
    //     }
    //     ///const match = await member.matchPassword(password);
       
    //     if (!members) {
    //       return next(new ErrorResponse('Invalid credentials', 400));
    //     } else {
    //       res.status(200).json({ success: true, msg: 'member login done' });
    //       console.log("member login success");
    //       sendTokenResponse(member, 200, res, members.role);
    //     }
    //   } else {
    //     res.status(200).json({ success: true, msg: 'trainer login done' });
    //     console.log("trainer login success");
    //     sendTokenResponse(trainer, 200, res, trainers.role);
    //   }
    // }
  
    // Check if password matches
   
  });
  const sendTokenResponse = (trainers , members, StatusCode, res) => {
  const tokentrainer = trainers.getSignedJwtToken();
  const tokenmember = members.getSignedJwtToken();  
  //trainer.getSignedJwtToken();

    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
        httpOnly:true
    };

    res
    .status(StatusCode)
    .cookie('tokentrainer', tokentrainer , option)
    .json({
        success:true,
        tokentrainer
    });

    res
    .status(StatusCode)
    .cookie('tokenmember',tokenmember , option)
    .json({
      success:true,
      tokenmember
    });
  }

  