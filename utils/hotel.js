const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

async function add(hotel) {
    return new Hotel(hotel).save()
}

function findOne(_id, req) {
    const currentUser = req.session.currentUser || {};
    return Hotel.findOne({ _id }).lean()
        .then(hotel => {
            hotel.isBookedByUser = hotel.bookedUsers.find(x => x == currentUser._id);
            hotel.isOwnedByUser = hotel.owner == currentUser._id;
            return hotel;
        })
        .catch(err => {
            console.log(err);
            return;
        })
}

async function getAll(req) {
    let hotels = await Hotel.find().lean();
    const currentUser = req.session.currentUser;
    if (hotels) {
        //hotels = Object.assign(hotels, currentUser);
        console.log(currentUser)
        hotels.forEach(hotel => {
            hotel.isLoggedIn = true;
        });
        hotels = hotels.sort((a, b) => {
            return b.freeRooms - a.freeRooms;
        })
        return { hotels, currentUser }
    }
    return { currentUser };
}

function isAvailable(_id) {
    return Hotel.findOne({ _id })
        .then(hotel => {
            if (hotel.freeRooms > 1) {
                hotel.freeRooms -= 1;
                hotel.save()
                return true
            } else {
                return false;
            }
        })
        .catch(err => {
            console.log(err);
            return;
        })
}

function updateArray(_id, arrayToUpdate, element) {
    return Hotel.findOne({ _id })
        .then(hotel => {
            hotel[arrayToUpdate].push(element);
            return hotel.save();
        })
}

module.exports = {
    add,
    findOne,
    getAll,
    isAvailable,
    updateArray
}