const express = require('express');
const router = express.Router();
const passport = require("passport");
const httpStatus = require('http-status-codes');
const helper = require('../helpers/common-helper');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.get('/list', (req, res, next) => {
    var sql = "select * from schedule where user_id=? and start_time >= ? and start_time <= ?"; 
    var params = [req.user.userId,req.query.start,req.query.end];
    db.all(sql, params, (err, rows) => {
                 if (err) {
                     console.log(err);
                    err.message = 'Error while getting user schedules. Try again later';                             
                    next(err);  
                 }
                 res.locals.data = rows;
                 return next();   
    });

});
router.post('/create', (req, res, next) => {
    const { name,description,start,end } = req.body;
    const { userId }=req.user;
    var sql ='INSERT INTO schedule (name, description, start_time,end_time,user_id) VALUES (?,?,?,?,?)'
        var params =[name,description,start,end,userId]
        db.run(sql, params, (err, resp) => {
            if(err){
                err.message = 'Error during creating user schedule. Try again later';                             
                next(err);            
            }    
            console.log(resp);        
           const response = {message:"Successfully created Schedule."};
                res.locals.data = response;
                return next();   
                        
        });                
});

module.exports = router;