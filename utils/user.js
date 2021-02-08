const User = require('../models/User');
const security = require('../auth/security');

async function register(user) {
    let  newUser = await security.hashPassword(user);
    newUser = new User(newUser);
    return newUser.save();
}

async function login(user) {
    const dbUser = await User.findOne({
        username: user.username
    }).lean();
    const passwordMatches = await security.checkUser(user, dbUser.password);
    return passwordMatches ? dbUser : false;
}

function isAuthenticated(req, res, next) {
    if (req.session.currentUser) {
    if ( !req.session.currentUser.hasOwnProperty('_id') ) {
        res.redirect('/guests/home'); 
        return;
    }
    } 
    next();
}

module.exports = {
    isAuthenticated,
    register,
    login
}