const jwt = require('jsonwebtoken');
let secret = 'secret'

function jwtToken(payLoad){
    return jwt.sign(payLoad, secret)
}

function decoded(token){
    return jwt.verify(token, secret);
} 

module.exports = {jwtToken, decoded}