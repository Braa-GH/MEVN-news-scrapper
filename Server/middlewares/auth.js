const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { readFileSync } = require('fs')
module.exports = (req,res,next) => {
    // check token
    const authHeader = req.get('Authorization')
    if (!authHeader){
        return next(createError(401))
    }
    //remove "Bearer"
    const token = authHeader.split(' ')[1];
    const secretKey = readFileSync('./configurations/private.key')
    try {
        const decode = jwt.verify(token,secretKey)
        req._id = decode._id;
        req.email = decode._email;
        next()

    }catch (e){
        return next(createError(401))
    }
}