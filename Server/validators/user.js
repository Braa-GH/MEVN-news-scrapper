const joi = require('@hapi/joi')

const signupSchema = joi.object({
    firstName: joi.string().min(2).max(10).required(),
    lastName: joi.string().min(2).max(15).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"))
        .message("password does not match our rules!")
        .required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"))
        .message("password does not match our rules!")
        .required()
})

module.exports = {signupSchema, loginSchema};
