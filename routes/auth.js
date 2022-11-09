const express = require('express')
const passport = require('passport')
const router  = express.Router()

// @desc    Authenticate with Google
// @route   GET /auth/google
router.get('/google', 
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/auth/google/callback', 
    passport.authenticate( 'google', {failureRedirect: '/'}), (res, req) => {
        res.redirect('/dashboard')
    })

module.exports = router