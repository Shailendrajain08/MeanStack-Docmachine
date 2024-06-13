const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var mongojs = require('mongojs');
var db = mongojs(process.env.DB_URL, ['users', 'tempUsers']);
var ObjectId = require('mongodb').ObjectID;
const UserModel = require('../models/users.model').UserModel;

module.exports = function (passport) {
    var opts = {};

    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;

    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        UserModel.find({ _id: jwtPayload._id }).then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch((err) => {
            var errMsg = {
                message: 'Unauthorized User For Mission Possible',
                err: err
            };
            return done(errMsg, false);
        })

    }));

}