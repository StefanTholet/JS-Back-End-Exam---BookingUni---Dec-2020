const { Router } = require('express');
const { saveSession } = require('../utils/session');
const user = require('../utils/user');
const hotel = require('../utils/hotel');
const router = Router();


router.get('/home', saveSession, user.isAuthenticated, saveSession, (req, res) => {
    hotel.getAll(req)
        .then(hotels => {
            console.log(hotels)
            res.render('home', hotels);
        }).catch(err => { res.end(); throw err } );
        return;
});

router.get('/add-hotel', user.isAuthenticated, saveSession, (req, res) => {
    const currentUser = req.session.currentUser;
    res.render('./members/create', currentUser);
});

router.post('/add-hotel', user.isAuthenticated, saveSession, (req, res) => {
    const currentHotel = Object.assign(req.body, { owner: req.session.currentUser._id });
    hotel.add(currentHotel)
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => err ? console.log(err) : null);
});

router.get('/hotel/:_id/details', user.isAuthenticated, saveSession, (req, res) => {
    hotel.findOne(req.params._id, req)
        .then(currentHotel => {
            const currentUser = req.session.currentUser;
            res.render('details', { currentHotel, currentUser });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/')
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        console.log(err);
        return
    });
    res.redirect('/guests/home')
});



module.exports = router;