const { Router } = require('express')
const session = require('../utils/session')
const user = require('../utils/user')
const router = Router();


router.get('/home', (req, res) => {

    if (!req.session.userId) {
        res.redirect('/guests/home');
        return;
    }
    console.log(req.session.userId);
    console.log(req.session.username);
    session.save(req.session)
    const isLoggedIn = user.isLoggedIn(req.session.userId);
    
    res.render('./members/home', { isLoggedIn })
})

module.exports = router;