const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();
const port = process.env.PORT || 3000
const app = express();

//MIDDLEWARE
app.use(express.json())
app.use(bodyParser.json())


//CONNECT MONGODB
mongoose.connect(process.env.MONGOOSE_CONNECT, () => console.log("MongoDB Connected!"))


// IMPORT ROUTES      
const authRoute = require('./routes/auth');


//ROUTES MIDDLEWARE
app.use('/auth', authRoute);



//LISTEN
app.listen(port, () => console.log(`Server running @ port ${port}`))