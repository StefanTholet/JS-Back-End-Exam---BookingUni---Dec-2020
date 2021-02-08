const { Router, query } = require('express');
const router = Router();
const user = require('../utils/user');
const hotel = require('../utils/hotel')
const session = require('../utils/session');
const { saveSession } = require('../utils/session');

router.get('/', saveSession, (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
        hotel.getAll(req)
        .then(hotels => {
            res.render('home', hotels);
        }).catch(err => { res.end(); throw err } );
        return;
    }
    res.redirect('/members/home')
})

router.get('/guests/home', (req, res) => {
    hotel.getAll(req)
        .then(hotels => {
            res.render('home', hotels);
        }).catch(err => { res.end(); throw err } );
        return;
})

router.get('/guests/register', (req, res) => {
    res.render('./guests/register')
});

router.post('/guests/register', async (req, res) => {
    user.register(req.body)
        .then((registeredUser) => {
            const currentUser = { username: registeredUser.username, _id: registeredUser._id };
            session.save(req.session, currentUser);
            res.redirect('/members/home')
        })
        .catch(err => {
            res.render('./guests/register');
            throw err;
        });
});

router.get('/guests/login', (req, res) => {
    res.render('./guests/login')
});

router.post('/guests/login', (req, res) => {
    user.login(req.body)
        .then(dbUser => {
            const currentUser = { username: dbUser.username, _id: dbUser._id, isLoggedIn: true }
            session.save(req.session, currentUser);
            res.redirect('/members/home')
        })
        .catch(err => {
            console.log(err);
            res.redirect('/guests/login');
        });
});

module.exports = router