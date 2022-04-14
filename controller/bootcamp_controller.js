const equip = require('../model/equipment');

// get all bootcamps
//route GET/api/v1/bootcamps
//access public
exports.getBootcamps = async (req , res , next) => {

    // res.status(200).json({ success: true , msg: 'show all bootcamps ', hello: req.hello});
    try {
        const viewallequip = await equip.find();

        res.status(200).json({ success: true,data: viewallequip});
    } catch (err) {
        res.status(400).json({ success: false }); 
    }
}


// get singal bootcamps
//route GET/api/v1/bootcamp
//access public
exports.getBootcamp = async (req , res , next) => {
   try {
       const singalview = await equip.findById(req.params.id);

       if(!singalview){
        return res.status(400).json({ success: false }); 
       }

       res.status(200).json({ success: true,data: singalview});
   } catch (err) {
    res.status(400).json({ success: false }); 
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
        res.status(400).json({ success: false }); 
    }
   
};


// update bootcamps
//route PUT/api/v1/bootcamp/:id
//access private
exports.updateBootcamps = async (req , res , next) => {
    
    const updateuip = await equip.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    });

    if(!updateuip)
    {
        return res.status(400).json({ success: false }); 
    }
    res.status(200).json({ success: true,data: updateuip});
    // try {
        
    // } catch (err) {
        
    // }
    
}


// delete bootcamps
//route DELETE/api/v1/bootcamp/:id
//access private
exports.deleteBootcamps = async (req , res , next) => {
    try {
        
    } catch (err) {
        
    }
    res.status(200).json({ success:true , msg: `Delete bootcamap ${req.params.id}`}); 
}