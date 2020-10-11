const express = require('express')
    , router = express.Router()
    , passport = require("passport");

router.use('/auth', require('./auth'));
router.use('/schedule',passport.authenticate('jwt', { session:false}), require('./schedules'));

module.exports = router;
