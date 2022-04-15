const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/Bootecamps');
const package = require('./routes/package_route');
const batch = require('./routes/batch_route');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorhandler = require('./middleware/error');
const { use } = require('./routes/Bootecamps');


dotenv.config({ path: './config/config.env'});

const app = express();

//body parser
app.use(express.json());

if(process.env.NODE_ENV ===  'development')
{
    app.use(morgan('dev'));
}


app.use('/equipment',bootcamp);
app.use('/package',package);
app.use('/batch',batch);
app.use(errorhandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//handle unhandle promise rejections
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`);
   // server.close(() => process.exit(1));
});

