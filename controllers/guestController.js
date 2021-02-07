const { Router, query } = require('express');
const router = Router();
const user = require('../utils/user');
const session = require('../utils/session')

router.get('/', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.render('./guests/home');
        return;
    }
    res.redirect('/members/home')
})

router.get('/guests/home', (req, res) => {
    res.render('./guests/home')
})

router.get('/guests/register', (req, res) => {
    res.render('./guests/register')
});

router.post('/guests/register', async (req, res) => {
    user.register(req.body)
        .then((currentUser) => {
            const user = { username: currentUser.username, _id: currentUser._id };
            session.save(req.session, user);
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
            const user = { username: dbUser.username, _id: dbUser._id, isLoggedIn: true }
            session.save(req.session, user);
            res.redirect('/members/home')
        })
        .catch(err => {
            console.log(err);
            res.redirect('/guests/login');
        });
});

module.exports = router