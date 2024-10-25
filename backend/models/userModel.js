const mongoose = require('mongoose');
require('dotenv').config();

const plm = require('passport-local-mongoose');

const userModel = new mongoose.Schema({
    fullname:String,
    
    email:String,
        
    password: String,
        
    confirmPassword : String,
},
{
    timestamps:true

})

userModel.plugin(plm, { usernameField: 'email' });

module.exports = mongoose.model('User', userModel);