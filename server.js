const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/Bootecamps');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

const app = express();

//body parser
app.use(express.json());

if(process.env.NODE_ENV ===  'development')
{
    app.use(morgan('dev'));
}


app.use('/equipment',bootcamp)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//handle unhandle promise rejections
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});

