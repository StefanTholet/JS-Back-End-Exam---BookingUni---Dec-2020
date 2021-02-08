const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    freeRooms: {
        type: Number,
        min: 1,
        max: 100
    },
    bookedUsers: {
        type: []
    },
    owner: {
        type: String,
        required: true
    }
});

 
module.exports = new mongoose.model('Hotel', hotelSchema);

