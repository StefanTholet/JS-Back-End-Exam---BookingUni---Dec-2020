const { Router } = require('express')
const session = require('../utils/session')
const user = require('../utils/user')
const router = Router();


router.get('/home', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.redirect('/guests/home');
        return;
    }
   // res.locals.user = user;
    res.render('./members/home', user)
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        console.log(err);
        return
    });
    res.redirect('/')
})

module.exports = router;