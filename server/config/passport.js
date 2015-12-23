/**
 * Created by @josleugim on 12/15/15.
 */
var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function() {

    // Using our db to make the login trough passport
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username:username}).exec(function (err, user) {
                if(user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    // Serialize our User, passport uses this function
    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });

    // Deserialize our user, passport uses this function
    passport.deserializeUser(function (id, done) {
        User.findOne({_id:id}).exec(function (err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};