const express = require('express');
const router = express.Router();
const passport = require("passport");
const httpStatus = require('http-status-codes');
const helper = require('../helpers/common-helper');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    const { name,email,password } = req.body;
    const {salt,hash} = helper.setPassword(password);
    var sql ='INSERT INTO user (name, email, password,salt) VALUES (?,?,?,?)'
        var params =[name, email, hash,salt]
        db.run(sql, params, (err, resp) => {
            if(err){
                err.message = 'Error during user signup. Try again later';                             
                next(err);            
            }            
           const response = {message:"Successfully registered."};
                res.locals.data = response;
                return next();   
                        
        });                
});

router.get('/logout', async (req, res, next) => {
    passport.authenticate('logout', (err,response,info) => {
        try {
            if (err) {
                err.status = httpStatus.UNAUTHORIZED;
                err.message = 'Something went wrong. please try again';
                next(err);
            }            
            next();
        }
        catch (error) {
            error.message = 'Something went wrong. please try again';
            next(error);
        }        
    })(req,res,next);    
});

router.post('/login', async (req, res, next) => {
    console.log(req,res);
    passport.authenticate('login', (err, response, info) => {
        try {
            if (err) {
                err.status = httpStatus.UNAUTHORIZED;
                err.message = 'Incorrect Login';
                next(err);
            }
            res.locals.data = response;
            next();
        }
        catch (error) {
            error.message = 'Incorrect Login';
            next(error);
        }
    })(req, res, next);
});

module.exports = router;