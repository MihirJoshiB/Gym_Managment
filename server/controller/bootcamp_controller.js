const equip = require('../model/equipment');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
// get all bootcamps
//route GET/api/v1/bootcamps
//access public
exports.getBootcamps = asyncHandler( async (req , res , next) => {

    // res.status(200).json({ success: true , msg: 'show all bootcamps ', hello: req.hello});
    
        const viewallequip = await equip.find();

        res.status(200).json({ success: true,count: viewallequip.length,data: viewallequip});
    
});


// get singal bootcamps
//route GET/api/v1/bootcamp
//access public
exports.getBootcamp = asyncHandler( async (req , res , next) => {
   
       const singalview = await equip.findById(req.params.id);

       if(!singalview){
        return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   
       }

       res.status(200).json({ success: true,data: singalview});
   
    // res.status(200).json({ success:true , msg: `Show bootcamap ${req.params.id}`}); 
});


// create bootcamps
//route POST/api/v1/bootcamps/
//access private
exports.createBootcamps = asyncHandler( async (req , res , next) => {
    // console.log(req.body);
    // res.status(200).json({ success:true , msg: 'Create bootcamap'}); 
   
        const equipm = await equip.create(req.body);

   res.status(201).json({
       success:true,
       data: equipm
   }); 
});


// update bootcamps
//route PUT/api/v1/bootcamp/:id
//access private
exports.updateBootcamps = asyncHandler( async (req , res , next) => {
   
    const updateuip = await equip.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updateuip)
    {
        return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updateuip});
    
});


// delete bootcamps
//route DELETE/api/v1/bootcamp/:id
//access private
exports.deleteBootcamps = asyncHandler( async (req , res , next) => {
   
        const deleteequip = await equip.findByIdAndDelete(req.params.id);
        if(!deleteequip)
        {
            return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   

        }
        res.status(200).json({ success: true,data: {}});

   
});