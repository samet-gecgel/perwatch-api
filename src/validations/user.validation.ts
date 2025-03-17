import Joi from "joi";
import { ERROR_MESSAGES } from "../constants/messages";

export const userValidation = {
    createUser: Joi.object({
        email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": ERROR_MESSAGES.VALIDATION.USER.EMAIL.INVALID,
            "any.required": ERROR_MESSAGES.VALIDATION.USER.EMAIL.REQUIRED,
            "string.empty": ERROR_MESSAGES.VALIDATION.USER.EMAIL.REQUIRED
        }),
        password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": ERROR_MESSAGES.VALIDATION.USER.PASSWORD.MIN,
            "any.required": ERROR_MESSAGES.VALIDATION.USER.PASSWORD.REQUIRED,
            "string.empty": ERROR_MESSAGES.VALIDATION.USER.PASSWORD.REQUIRED
        }),
        name: Joi.string()
        .required()
        .min(3)
        .messages({
            "string.min": ERROR_MESSAGES.VALIDATION.USER.NAME.MIN,
            "any.required": ERROR_MESSAGES.VALIDATION.USER.NAME.REQUIRED,
            "string.empty": ERROR_MESSAGES.VALIDATION.USER.NAME.REQUIRED
        })
    }),
    updateUser: Joi.object({
        email: Joi.string()
        .email()
        .messages({
            "string.email": ERROR_MESSAGES.VALIDATION.USER.EMAIL.INVALID
        }),
        password: Joi.string()
        .min(3)
        .messages({
            "string.min": ERROR_MESSAGES.VALIDATION.USER.PASSWORD.MIN
        }),
        name: Joi.string()
        .min(3)
        .messages({
            "string.min": ERROR_MESSAGES.VALIDATION.USER.NAME.MIN
        })
    }).min(1)
    .messages({
        "object.min": ERROR_MESSAGES.VALIDATION.GENERAL.MIN_ONE_FIELD
    })
}
