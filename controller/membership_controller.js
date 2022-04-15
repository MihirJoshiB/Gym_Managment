const membership = require('../model/membership');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getmemberships = asyncHandler( async (req , res , next) => {

    let query;
    if(req.params.packageId)
    {
        query = membership.find({ package: req.params.packageId});
    }
    else
    {
        query = membership.find();
    }

    const member = await query;
    res.status(200).json({
        success: true,
        count: member.length,
        data: member
    });
    
});