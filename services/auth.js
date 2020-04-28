const createError = require('http-errors');
const crypto2 = require('crypto2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models/');
const User = db.User;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOpts = require('../config/jwt');
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();


passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    }, 
    async function (username, password, done) {
        const user = await User.findAll({
          attributes: ['id', 'username', 'name'],
          where: {
            username: username,
            password: await crypto2.hash.sha1(password)
          },
          raw: true,
          limit: 1
        });
        if (!user) {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
        return done(null, user[0], {message: 'Logged In Successfully'});
    }
));

passport.use(new JwtStrategy(jwtOpts, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token);
  } catch (error) {
    done(error);
  }
}));


const authenticate = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err || info || !user ) { 
      next(createError(401));
    }else{
        req.userId = user.id;
        return next();
    }
  })
  (req, res, next)
}

module.exports = {
  authenticate
}