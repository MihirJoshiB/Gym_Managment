const batch = require('../model/Batch');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');


exports.addbatch = asyncHandler( async (req , res , next) => {
    
    // const batchsche = batch({
    //     batch_name,batch_start_time,batch_end_time
    // });

    // batchsche.batch_name=batch_name;
    // batchsche.batch_start_time = convertFromStringToDate('0000-00-00T0'+batch_start_time);
    // batchsche.batch_end_time = convertFromStringToDate('0000-00-00T0'+batch_end_time);
    const batchs = await batch.create(req.body);

res.status(201).json({
   success:true,
   data: batchs
}); 
});

exports.getBatches = asyncHandler( async (req , res , next) => {

    // res.status(200).json({ success: true , msg: 'show all bootcamps ', hello: req.hello});
    
        const viewatch = await batch.find();

        res.status(200).json({ success: true,count: viewatch.length,data: viewatch});
    
});

exports.getbatch = asyncHandler( async (req , res , next) => {
   
    const viewsingalbatch = await batch.findById(req.params.id);

    if(!viewsingalbatch){
     return next(new ErrorResponse(`Batch not found with batch id ${req.params.id}`,404));   
    }

    res.status(200).json({ success: true,data: viewsingalbatch});


});

exports.updatebatch = asyncHandler( async (req , res , next) => {
   
    const updatebatch = await batch.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updatebatch)
    {
        return next(new ErrorResponse(`batch not found with batch id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updatebatch});
    
});

exports.deletebatch = asyncHandler( async (req , res , next) => {
   
    const deletebatch = await batch.findByIdAndDelete(req.params.id);
    if(!deletebatch)
    {
        return next(new ErrorResponse(`batch not found with id ${req.params.id}`,404));   

    }
    res.status(200).json({ success: true,data: {}});


});