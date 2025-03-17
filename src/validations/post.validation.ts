import Joi from "joi";
import { ERROR_MESSAGES } from "../constants/messages";

export const postValidation = {
    createPost: Joi.object({
        title: Joi.string()
            .required()
            .min(3)
            .max(100)
            .messages({
                "string.empty": ERROR_MESSAGES.VALIDATION.POST.TITLE.REQUIRED,
                "string.min": ERROR_MESSAGES.VALIDATION.POST.TITLE.MIN,
                "string.max": ERROR_MESSAGES.VALIDATION.POST.TITLE.MAX,
                "any.required": ERROR_MESSAGES.VALIDATION.POST.TITLE.REQUIRED,
            }),
            content: Joi.string()
                .required()
                .min(10)
                .messages({
                    "string.empty": ERROR_MESSAGES.VALIDATION.POST.CONTENT.REQUIRED,
                    "string.min": ERROR_MESSAGES.VALIDATION.POST.CONTENT.MIN,
                    "any.required": ERROR_MESSAGES.VALIDATION.POST.CONTENT.REQUIRED,
                }),
            tags: Joi.array()
                .items(Joi.string())
                .min(1)
                .required()
                .messages({
                    "array.min": ERROR_MESSAGES.VALIDATION.POST.TAGS.MIN,
                    "array.required": ERROR_MESSAGES.VALIDATION.POST.TAGS.REQUIRED,
                    "any.required": ERROR_MESSAGES.VALIDATION.POST.TAGS.REQUIRED,
                }),
            author: Joi.string()
                .required()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .messages({
                    "string.empty": ERROR_MESSAGES.VALIDATION.POST.AUTHOR.REQUIRED,
                    "any.required": ERROR_MESSAGES.VALIDATION.POST.AUTHOR.REQUIRED,
                    "string.pattern.base": ERROR_MESSAGES.VALIDATION.POST.AUTHOR.INVALID_FORMAT,
                }),
    }),
    updatePost: Joi.object({
        title: Joi.string()
            .min(3)
            .max(100)
            .messages({
                "string.min": ERROR_MESSAGES.VALIDATION.POST.TITLE.MIN,
                "string.max": ERROR_MESSAGES.VALIDATION.POST.TITLE.MAX,
            }),
        content: Joi.string()
            .min(10)
            .messages({
                "string.min": ERROR_MESSAGES.VALIDATION.POST.CONTENT.MIN,
            }),
        tags: Joi.array()
            .items(Joi.string())
            .min(1)
            .messages({
                "array.min": ERROR_MESSAGES.VALIDATION.POST.TAGS.MIN,
                "array.required": ERROR_MESSAGES.VALIDATION.POST.TAGS.REQUIRED,
            })
    }).min(1)
    .messages({
        "object.min": ERROR_MESSAGES.VALIDATION.GENERAL.MIN_ONE_FIELD,
    })
}
