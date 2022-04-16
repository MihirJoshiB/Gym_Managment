
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const trainer = require('../model/trainer');



exports.gettrainers = asyncHandler( async (req , res , next) => {
  
        const viewtrainers = await trainer.find();

        res.status(200).json({ success: true,count: viewtrainers.length,data: viewtrainers});
    
});


exports.gettrainer = asyncHandler( async (req , res , next) => {

    // const{Trainer_Name,Trainer_Image,Gender,Address,phone,email,password,DOB,Height,Wight,Speciality,Experience} = req.body;
   
    // const user = await trainer.create({
    //     Trainer_Name,Trainer_Image,Gender,Address,phone,email,password,DOB,Height,Wight,Speciality,Experience
    // })
    // //    const singatrainer = await trainer.findById(req.params.id);

    //      //token
    //      const token = user.getSignedJwtToken();

    //      res.status(201).json({
    //          success:true,
    //          token
            
    //      }); 
    //    if(!singatrainer){
    //     return next(new ErrorResponse(`trainer not found with id ${req.params.id}`,404));   
    //    }

    const viewtrainer = await trainer.findById(req.params.id);

    if(!viewtrainer){
     return next(new ErrorResponse(`trainer not found with batch id ${req.params.id}`,404));   
    }

    res.status(200).json({ success: true,data: viewtrainer});
   
  
});



exports.addtrainer = asyncHandler( async (req , res , next) => {
    
        
        const addtrainer = await trainer.create(req.body);


   res.status(201).json({
       success:true,
       data:addtrainer
      
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