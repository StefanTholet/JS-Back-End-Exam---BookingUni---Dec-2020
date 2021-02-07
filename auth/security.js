const uniqid = require('uniqid');
const bcrypt = require('bcrypt')


async function hashPassword(user) {
    return bcrypt.hash(user.password, 5).then(function (hash) {
        user.password = hash;
        return user;
    });
}

async function checkUser(user, dbPass) {
    const match = await bcrypt.compare(user.password, dbPass);
    console.log('checking..')
    return match
}


module.exports = {
    hashPassword,
    checkUser
}