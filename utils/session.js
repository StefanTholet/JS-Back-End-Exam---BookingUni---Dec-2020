const session = require('express-session');

function save(currentSession, currentUser) {
    if (currentUser) {
        currentSession.currentUser = currentUser;
    }
    return currentSession.save(err => {
        if (err) {
            console.log(err);
            return;
        };
    })
}

function saveSession(req, res, next) {
    req.session.currentUser = req.session.currentUser || {};
    req.session.save(err => {
        if (err) {
            console.log(err);
            return;
        }
    });
    next()
}

module.exports = {
    save,
    saveSession
}

