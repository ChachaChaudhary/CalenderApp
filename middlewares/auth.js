const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const helper = require('../helpers/common-helper');
const httpStatus = require('http-status-codes');

passport.use(new JWTstrategy({
  secretOrKey: "top_secret",
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
}, async (req, token, done) => {
  let tokenStr = ExtractJWT.fromAuthHeaderAsBearerToken()(req);    
  db.get("select * from expired_tokens where token= ?", [tokenStr], (err,resp) => {
    if(err || resp){
      return done({status: httpStatus.UNAUTHORIZED,
        message:'Unauthorized Access'
      });
    }
     return done(null,token);
  });
   
}));

passport.use('logout',new JWTstrategy({
  secretOrKey: "top_secret",
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
}, async (req, token, done) => {
    let tokenStr = ExtractJWT.fromAuthHeaderAsBearerToken()(req);    
    db.get("select * from user where email= ?", [token.email], (err,user) => {
    if(err){
      return done(err);
    }
    if(user){
      db.run("INSERT INTO expired_tokens (token) VALUES (?)", [tokenStr], (err,resp) => {
        if(err){
          return done(err);
        }
        return done(null,resp);
      });      
    }else{
      return done({status: httpStatus.UNAUTHORIZED,
        message:'Unauthorized Access'
      });
    }    
  });
}));

passport.use('login',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},(userId, password, done) => {
  const query = "select * from user where email= ?";
  db.get(query, [userId],(err,user)=>{
    if(err){
      err.message = "Invalid Username or Password. Please Try Again.";
      return done(err);
    }
    if(user){
      if ( !helper.validatePassword(user,password)) {
        return done({ message: 'email or password is invalid' });
      }
      let resp = {
        token: helper.generateJWT(user)
      };
      return done(null,resp);
      }else{
      return done({message:'Invalid User.', status:httpStatus.BAD_REQUEST});
    }    
  })  
}));
