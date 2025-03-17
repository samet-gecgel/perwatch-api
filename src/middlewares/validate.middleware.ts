import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ERROR_MESSAGES } from "../constants/messages";

export const validate = (schema: Joi.ObjectSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      logger.error(ERROR_MESSAGES.SYSTEM.VALIDATION_ERROR, errorMessage);

      res.status(400).json({
        status: "error",
        message: ERROR_MESSAGES.SYSTEM.VALIDATION_ERROR,
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
      return;
    }

    next();
  };
};
