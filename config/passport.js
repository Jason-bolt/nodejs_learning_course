const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function (request, accessToken, refreshToken, profile, cb) {
        console.log(profile)
    }))

    passport.serializeUser( (user, cb) => {
        process.nextTick(() => {
          cb(null, { id: user.id, username: user.username, name: user.name });
        });
      });
      
      passport.deserializeUser( (user, cb) => {
        process.nextTick(() => cb(null, user))
      });
}