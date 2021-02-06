const session = require('express-session');

function save(currentSession, userId, username) {
    if (userId) {
    currentSession.userId = userId;
    currentSession.username = username
}
    return currentSession.save(err => {
        if (err) {
            console.log(err);
            return;
        };
    })
}

module.exports = {
    save,
}

