import Joi from "joi";
import validator from './default.validator'

const create =
    validator({
        body: Joi.object({
            user: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
                email: Joi.string().required()
            }).required()
        })
    })

const UserValidator = {
    create
}


export { UserValidator }