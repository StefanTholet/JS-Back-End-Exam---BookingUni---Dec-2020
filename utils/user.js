const User = require('../models/User');
const security = require('../auth/security');

async function register(user) {
    let  newUser = await security.hashPassword(user);
    newUser = new User(newUser);
    return newUser.save();
}

function login(user) {

}

function isLoggedIn(userId) {
    return userId ? true : false;
}

module.exports = {
    isLoggedIn,
    register,
    login
}