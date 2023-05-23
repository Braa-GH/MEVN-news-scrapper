const { User } = require('../models')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')

const signup = (req,res,next) => {
    const userData = req.body;
    //validation
    const validateResult = User.valid(userData);

    if (validateResult.error){
        //data does not match our rules
        next(createError(400, validateResult.error.message))
    }else {
        //check existence
        const user = new User(userData);

        user.isExist().then(result => {
            if (result.existence){
                //user is already exist
                next(createError(409, result.message))
            }else {
                //add user to db
                user.add((cb) => {
                    if (cb.status === true){
                        //adding user to db success
                        res.status(201).json({
                            status: true,
                            message: 'user added successfully'
                        })
                    }else {
                        //failed to add user
                        next(createError(500, cb.message))
                    }

                });
            }

        })
            .catch(err => {
                next(createError(500, err.message))
            });
    }


}

const login = (req,res,next) => {
    User.login(req.body)
        .then(result => {
            if (result.status){
                const jwtSecretKey = readFileSync('./configurations/private.key') ; //get private key
                const token = jwt.sign({ //generate token
                    _id: result.data._id,
                    email: result.data.email
                }, jwtSecretKey)
                res.status(200).json(token)
            }else {
                next(createError(result.code, result.message));
            }
        })
        .catch(e => {
            next(createError(500, e.message))
        })
}

module.exports = {
    signup, login
};