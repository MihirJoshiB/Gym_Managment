
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const member = require('../model/member_reg');



exports.getmembers = asyncHandler( async (req , res , next) => {
  
        const viewmembers = await member.find();

        res.status(200).json({ success: true,count: viewmembers.length,data: viewmembers});
    
});


exports.getmember = asyncHandler( async (req , res , next) => {

   
    const viewmember = await member.findById(req.params.id);

    if(!viewmember){
     return next(new ErrorResponse(`member not found with batch id ${req.params.id}`,404));   
    }

    res.status(200).json({ success: true,data: viewmember});
   
  
});



exports.addmember = asyncHandler( async (req , res , next) => {
    
        
        const add = await member.create(req.body);


   res.status(201).json({
       success:true,
       data:add
      
   }); 
});



exports.updatemember = asyncHandler( async (req , res , next) => {
   
    const updatemember = await member.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updatemember)
    {
        return next(new ErrorResponse(`member not found with id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updatemember});
    
});



exports.deletememebr = asyncHandler( async (req , res , next) => {
   
        const deletememebr = await member.findByIdAndDelete(req.params.id);
        if(!deletememebr)
        {
            return next(new ErrorResponse(`member not found with id ${req.params.id}`,404));   

        }
        res.status(200).json({ success: true,data: {}});

   
});