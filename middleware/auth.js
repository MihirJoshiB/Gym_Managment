const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../util/errorResponse');
const trainer = require('../model/trainer');
const res = require('express/lib/response');

exports.protect = asyncHandler(async (req,res,next)=> {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('gym')
    )
    {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token)
    {
        return next(new ErrorResponse('Not authorize to access this route',401));
    }
    try{
      const decoded = jwt.verify(token,process.env,JWT_SERECT);
        console.log(decoded);
        req.user = await trainer.findById(decoded.id);
        next();
    }
    catch(err)
    {
        return next(new ErrorResponse('Not authorize to access this route',401));
    }
});