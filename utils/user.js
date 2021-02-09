const User = require('../models/User');
const security = require('../auth/security');

async function register(user) {
    let newUser = await security.hashPassword(user);
    newUser = new User(newUser);
    return newUser.save();
}

async function login(user) {
    const dbUser = await User.findOne({
        username: user.username
    }).lean();
    const passwordMatches = await security.checkUser(user.password, dbUser.password);
    return passwordMatches ? dbUser : false;
}

function isAuthenticated(req, res, next) {
    if (req.session.currentUser) {
        if (!req.session.currentUser.hasOwnProperty('_id')) {
            res.redirect('/guests/home');
            return;
        }
    } else if (!req.session.currentUser) {
        res.redirect('/guests/home');
        return;
    }
   
    next();
}

function updateArray(_id, arrayToUpdate, element) {
    return User.findOne({ _id })
        .then(user => {
            user[arrayToUpdate].push(element);
            return user.save();
        })
}

module.exports = {
    isAuthenticated,
    register,
    login,
    updateArray
}