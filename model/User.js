//IMPORT MONGOOSE
const mongoose = require('mongoose');

//SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        min: 5
    },
    password:{  	
        type: String,
        required: true,
        min: 5
    }
});

//EXPORT MODEL
module.exports = mongoose.model('User', userSchema)