import joi from 'joi'

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required()
});

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required(),
    repeat_password: joi.ref('password')
});