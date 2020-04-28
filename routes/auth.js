const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const jwtOpts = require('../config/jwt');


/**
* @swagger
*
* /auth/login:
*   post:
*     tags:
*       - login
*     summary: Get a valid token
*     description: Get a valid token for a autentificated user
*     parameters:
*       - $ref: '#/components/parameters/UsernameQueryParam'
*       - $ref: '#/components/parameters/PasswordQueryParam'
*     responses:
*       200:
*         description: Return the token
*         content:
*           application/json:
*             schema:
*              $ref: '#/components/schemas/LoginInfo'
*       422:
*         $ref: '#/components/responses/UnprocessableEntity'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*           
*
*/
router.post('/login', (req, res, next) => {
    
    passport.authenticate('login', (err, user, info) => {
        if (err || !user) {
            return res.status(422).json({
                errors: [{
                    msg: 'Login error'
                }]
            });
        }   
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, jwtOpts.secretOrKey, {expiresIn: jwtOpts.expiresIn});
            return res.json({user, token});
        });
    })(req, res, next);
});

module.exports = router;
