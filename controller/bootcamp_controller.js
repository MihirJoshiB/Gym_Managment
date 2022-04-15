const equip = require('../model/equipment');
const ErrorResponse = require('../util/errorResponse');
const Errorhandler = require('../util/errorResponse');
// get all bootcamps
//route GET/api/v1/bootcamps
//access public
exports.getBootcamps = async (req , res , next) => {

    // res.status(200).json({ success: true , msg: 'show all bootcamps ', hello: req.hello});
    try {
        const viewallequip = await equip.find();

        res.status(200).json({ success: true,count: viewallequip.length,data: viewallequip});
    } catch (err) {
        next(err);
    }
}


// get singal bootcamps
//route GET/api/v1/bootcamp
//access public
exports.getBootcamp = async (req , res , next) => {
   try {
       const singalview = await equip.findById(req.params.id);

       if(!singalview){
        return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   
       }

       res.status(200).json({ success: true,data: singalview});
   } catch (err) {
    // res.status(400).json({ success: false });
   next(err);
   }
    // res.status(200).json({ success:true , msg: `Show bootcamap ${req.params.id}`}); 
}


// create bootcamps
//route POST/api/v1/bootcamps/:id
//access private
exports.createBootcamps = async (req , res , next) => {
    // console.log(req.body);
    // res.status(200).json({ success:true , msg: 'Create bootcamap'}); 
    try {
        const equipm = await equip.create(req.body);

   res.status(201).json({
       success:true,
       data: equipm
   });
        
    } catch (err) {
        next(err);
    }
   
};


// update bootcamps
//route PUT/api/v1/bootcamp/:id
//access private
exports.updateBootcamps = async (req , res , next) => {
    try{
    const updateuip = await equip.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
       
    });

    if(!updateuip)
    {
        return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   
    }
    res.status(200).json({ success: true,data: updateuip});
}
    catch (err)
    {
        next(err);
    }
    // try {
        
    // } catch (err) {
        
    // }  
    
};


// delete bootcamps
//route DELETE/api/v1/bootcamp/:id
//access private
exports.deleteBootcamps = async (req , res , next) => {
    try {
        const deleteequip = await equip.findByIdAndDelete(req.params.id);
        if(!deleteequip)
        {
            return next(new ErrorResponse(`Equipment not found with id ${req.params.id}`,404));   
        }
        res.status(200).json({ success: true,data: {}});

    } catch (err) {
        next(err);
    }
};