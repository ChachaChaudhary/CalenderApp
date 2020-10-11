const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const setPassword = function (password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return {salt,hash};
};

const validatePassword = function (curData,password) {
    const hash = crypto.pbkdf2Sync(password, curData.salt, 10000, 512, 'sha512').toString('hex');
    return curData.password === hash;
};

const generateJWT = function (data) {     
    var exp = Math.floor(Date.now() / 1000) + 604800;
    return jwt.sign({
        userId: data.id,
        email:data.email,
        name: data.name,       
        exp: exp,
      }, "top_secret");    
};


module.exports = {
    setPassword,
    validatePassword,
    generateJWT
}