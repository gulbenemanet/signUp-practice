const passport = require('passport')
const googlePass = require('passport-google-oauth20').Strategy
const User = require('../Models/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(new googlePass({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        //console.log("access token: ", accessToken);
        //console.log(profile);
        User.findOne({ googleId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    new User({
                            googleId: profile.id,
                            name: profile.name.givenName,
                            email: profile.emails[0].value
                        }).save()
                        .then(newUser => done(null, newUser));
                }
            })
    }
));