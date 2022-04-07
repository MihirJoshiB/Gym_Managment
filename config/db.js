const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/gym", {
    
}).then(() => {
    console.log("Done");
}).catch((e) => {
    console.log("No");
})
// const connectDB = async () => {
//     const conn = await mongoose.connect(process.env.MONGO_URI,{
       
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
// }
// module.exports = connectDB;