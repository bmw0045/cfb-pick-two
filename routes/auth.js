const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
    const messages = req.flash();
    res.render('login', {messages});
});

router.post('/login', passport.authenticate('local',
    {failureRedirect: '/auth/login', failureFlash: 'Wrong email or password'}), (req, res, next) => {
        res.redirect('/users');
});

//router.get('/register', (req))
module.exports = router;