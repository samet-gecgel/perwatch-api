import { Request, Response } from "express";
import User from "../models/user.model";
import { logger } from "../utils/logger";
import { userService } from "../services/user.service";
import { ERROR_MESSAGES } from "../constants/messages";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    logger.error(ERROR_MESSAGES.USER.GET_ERROR, error);
    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.USER.GET_ERROR,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.USER.GET_ERROR, error);
    res.status(error.message === ERROR_MESSAGES.USER.NOT_FOUND ? 404 : 500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.USER.CREATE_ERROR, error);

    if (error.message === ERROR_MESSAGES.USER.PASSWORD_COMPARE_ERROR) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        return;
    }

    if (error.name === "ValidationError") {
      res.status(400).json({
        status: "error",
        message: ERROR_MESSAGES.SYSTEM.VALIDATION_ERROR,
        errors: Object.values(error.errors).map((err: any) => ({
          field: err.path,
          message: err.message,
        })),
      });
      return;
    }

    if (error.message === ERROR_MESSAGES.VALIDATION.USER.EMAIL.EXISTS) {
      res.status(400).json({
        status: "error",
        message: error.message
      });
      return;
    }

    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.USER.CREATE_ERROR,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.USER.UPDATE_ERROR, error);

    if (error.message === ERROR_MESSAGES.USER.PASSWORD_COMPARE_ERROR) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
        return;
      }
  

    if (error.name === "ValidationError") {
      res.status(400).json({
        status: "error",
        message: ERROR_MESSAGES.SYSTEM.VALIDATION_ERROR,
        errors: Object.values(error.errors).map((err: any) => ({
          field: err.path,
          message: err.message,
        })),
      });
      return;
    }

    if (error.message === ERROR_MESSAGES.VALIDATION.USER.EMAIL.EXISTS) {
      res.status(400).json({
        status: "error",
        message: error.message
      });
      return;
    }

    if (error.message === ERROR_MESSAGES.USER.NOT_FOUND) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.USER.UPDATE_ERROR,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.USER.DELETE_ERROR, error);
    res.status(error.message === ERROR_MESSAGES.USER.NOT_FOUND ? 404 : 500).json({
      status: "error",
      message: error.message,
    });
  }
};
