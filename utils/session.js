const session = require('express-session');

function save(currentSession, user) {
    if (user) {
    currentSession.user = user;
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

