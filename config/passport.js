const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (request, accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id })

            if (user) {
                done(null, user)
            }else{
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (error) {
            
        }
    }))

    passport.serializeUser( (user, done) => {
        process.nextTick(() => {
          done(null, { id: user.id, username: user.username, name: user.name });
        });
      });
      
      passport.deserializeUser( (user, done) => {
        process.nextTick(() => done(null, user))
      });
}