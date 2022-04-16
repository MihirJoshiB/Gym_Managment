const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const cookiparser = require('cookie-parser');
//route files
const bootcamp = require('./routes/Bootecamps');
const package = require('./routes/package_route');
const batch = require('./routes/batch_route');
 const trainer = require('./routes/trainer_route');
const auth = require('./routes/auth');
const members = require('./routes/member_route');
// const members = require('./routes/membership_route');

const morgan = require('morgan');
const connectDB = require('./config/db');
const errorhandler = require('./middleware/error');
const { use } = require('./routes/Bootecamps');


dotenv.config({ path: './config/config.env'});

const app = express();

//body parser
app.use(express.json());
//cookie parser
app.use(cookiparser());

if(process.env.NODE_ENV ===  'development')
{
    app.use(morgan('dev'));
}

//file uplaod
app.use(fileupload());


app.use('/equipment',bootcamp);
app.use('/package',package);
app.use('/batch',batch);
 app.use('/trainer',trainer);
app.use('/auth',auth);
app.use('/member_reg',members);
// app.use('/membership',members);
app.use(errorhandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//handle unhandle promise rejections
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`);
   // server.close(() => process.exit(1));
});

