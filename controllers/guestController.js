const { Router, query } = require('express');
const router = Router();
const user = require('../utils/user');
const memberRouter = require('./memberController');
const session = require('../utils/session')
router.get('/', (req, res) => {
    const isMember = user.isLoggedIn(req.session.userId);
    if (!isMember) {
        res.redirect('./guests/home');
        return;
    }
    res.redirect('/members/home')
})

router.get('/guests/home', (req, res) => {
    res.render('./guests/home')
})

router.get('/guests/register', (req, res) => {
    const isMember = user.isLoggedIn();
    res.render('./guests/register', { isMember })
});

router.post('/guests/register', async (req, res) => {
    try {
        const newUser = await user.register(req.body);
        const userId = newUser._id;
        const username = newUser.username
        if (userId) {
       session.save(req.session, userId, username)
        res.redirect('/members/home');
    } else {
        res.render('./guests/register')
    }
 } catch (err) {
        console.log(err);
        return;
    }
})

router.get('/guest/login', (req, res) => {
    res.render('./guest/login')
})

module.exports = router