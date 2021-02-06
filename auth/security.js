const uniqid = require('uniqid');
const bcrypt = require('bcrypt')


async function hashPassword(user) {
    return bcrypt.hash(user.password, 5).then(function(hash) {
        console.log('first')
        user.password = hash;
        return user;
});
}

module.exports = {
    hashPassword
}