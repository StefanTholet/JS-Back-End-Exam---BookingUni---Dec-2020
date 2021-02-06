const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']     
    },
    username: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,  
        required: true,
        match: [/^.{5,}/, 'Your password must consist of a minimum of 5 symbols']  
    },
    bookedHotels: {
        type: [],    
        required: true
    },
    offeredHotels: {
        type: [],    
        required: true
    }
});

module.exports = new mongoose.model('User', userSchema);