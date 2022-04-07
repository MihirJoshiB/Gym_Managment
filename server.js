const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

// connectDB();

//route files  
const bootcamps = require('./routes/Bootecamps');

const res = require('express/lib/response');



const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}


//mount routers
const server = app.use('/',bootcamps)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//handle unhandle promise rejections

process.on('unhandleRejection', (err,Promise) => {
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
});
