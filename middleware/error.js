const ErrorResponse = require("../util/errorResponse");

const errorhandler = (err,req,res,next) => {
    let error = { ...err }
    error.message = err.message;
    console.log(err.stack.red);
    if(err.name == 'CastError')
    {
        const message =  `not foud with id of ${err.value}`;
        error = new ErrorResponse(message,404);
    }

    //duplicate key error
    if(err.code == 11000)
    {
        const message = 'Dupicate field value entered';
        error = new ErrorResponse(message,400);
    }

    res.status(err.statusCode  || 500).json({
    error:error.message || 'server Error'
    });
}; 
module.exports = errorhandler;