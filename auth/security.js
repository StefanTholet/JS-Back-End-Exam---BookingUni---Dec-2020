const uniqid = require('uniqid');
const bcrypt = require('bcrypt')


async function hashPassword(user) {
    return bcrypt.hash(user.password, 5).then(function (hash) {
        user.password = hash;
        return user;
    });
}

async function checkUser(userPassword, dbPass) {
    const match = await bcrypt.compare(userPassword, dbPass);
    console.log('checking..')
    return match
}


module.exports = {
    hashPassword,
    checkUser
}