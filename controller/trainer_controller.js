
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const trainer = require('../model/trainer');



exports.gettrainers = asyncHandler( async (req , res , next) => {
  
        const viewtrainers = await trainer.find();

        res.status(200).json({ success: true,count: viewtrainers.length,data: viewtrainers});
    
});


exports.gettrainer = asyncHandler( async (req , res , next) => {
   
       const singatrainer = await trainer.findById(req.params.id);

       if(!singatrainer){
        return next(new ErrorResponse(`trainer not found with id ${req.params.id}`,404));   
       }

       res.status(200).json({ success: true,data: singatrainer});
   
  
});



exports.addtrainer = asyncHandler( async (req , res , next) => {
    
        const addtrainer = await trainer.create(req.body);

   res.status(201).json({
       success:true,
       data: addtrainer
   }); 
});



exports.updatetrainer = asyncHandler( async (req , res , next) => {
   
    const updatetrainer = await trainer.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updatetrainer)
    {
        return next(new ErrorResponse(`trainer not found with id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updatetrainer});
    
});



exports.deletetrainer = asyncHandler( async (req , res , next) => {
   
        const deletetrainer = await trainer.findByIdAndDelete(req.params.id);
        if(!deletetrainer)
        {
            return next(new ErrorResponse(`trainer not found with id ${req.params.id}`,404));   

        }
        res.status(200).json({ success: true,data: {}});

   
});