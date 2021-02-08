const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

function add(hotel) {
    return new Hotel(hotel).save();
}

function findOne(_id, req) {
    const currentUser = req.session.currentUser;
    return Hotel.findOne({_id}).lean()
    .then(hotel => {
        hotel.isBookedByUser = hotel.bookedUsers.find(x => x == currentUser._id);
        hotel.isOwnedByUser = hotel.owner == currentUser._id;
        return hotel;
    })
}

async function getAll(req) {
    let hotels = await Hotel.find().lean();
    const currentUser = req.session.currentUser;
    if (hotels) {
        //hotels = Object.assign(hotels, currentUser);
        hotels.forEach(hotel => {
            hotel.isLoggedIn = true;
        })
        return { hotels, currentUser }
    }
    return { currentUser };
}


module.exports = {
    add,
    findOne,
    getAll,
}