const { Router } = require('express');

const router = Router();

const guestController = require('../controllers/guestController');
const memberController = require('../controllers/memberController')

router.use('/', guestController);

router.use('/members/', memberController)

module.exports = router
