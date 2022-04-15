const package = require('../model/Package');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');


exports.getPackages = asyncHandler( async (req , res , next) => {

    // res.status(200).json({ success: true , msg: 'show all bootcamps ', hello: req.hello});
    
        const viewpackage = await package.find();

        res.status(200).json({ success: true,count: viewpackage.length,data: viewpackage});
    
});


exports.getPackage = asyncHandler( async (req , res , next) => {
   
       const singalpackage = await package.findById(req.params.id);

       if(!singalpackage){
        return next(new ErrorResponse(`Package not found with id ${req.params.id}`,404));   
       }

       res.status(200).json({ success: true,data: singalpackage});
   
  
});



exports.addpackage = asyncHandler( async (req , res , next) => {
    
        const pack = await package.create(req.body);

   res.status(201).json({
       success:true,
       data: pack
   }); 
});



exports.updatepackage = asyncHandler( async (req , res , next) => {
   
    const updatepackage = await package.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updatepackage)
    {
        return next(new ErrorResponse(`Package not found with id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updatepackage});
    
});



exports.deletepackage = asyncHandler( async (req , res , next) => {
   
        const deletepackage = await package.findByIdAndDelete(req.params.id);
        if(!deletepackage)
        {
            return next(new ErrorResponse(`Package not found with id ${req.params.id}`,404));   

        }
        res.status(200).json({ success: true,data: {}});

   
});