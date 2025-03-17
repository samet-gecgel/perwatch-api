import { Request, Response } from "express";
import { postService } from "../services/post.service";
import { logger } from "../utils/logger";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.POST.GET_ERROR,
    });
  }
};

export const getPostsByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await postService.getPostsByUser(req.params.userId);
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
    const statusCode = error.message === ERROR_MESSAGES.USER.NOT_FOUND ? 404 : 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getPostsByTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await postService.getPostsByTag(req.params.tag);
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
    const statusCode = error.message === ERROR_MESSAGES.POST.NOT_FOUND_FOR_TAG ? 404 : 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
    res.status(error.message === ERROR_MESSAGES.POST.NOT_FOUND ? 404 : 500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.CREATE_ERROR, error);

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

    if(error.message === ERROR_MESSAGES.USER.NOT_FOUND) {
        res.status(404).json({
            status: "error",
            message: ERROR_MESSAGES.USER.NOT_FOUND,
            errors: [{
                field: "author",
                message: error.message,
            }]
        });
        return;
    }

    if(error.name === "BSONError" || error.name === "CastError") {
        res.status(400).json({
            status: "error",
            message: ERROR_MESSAGES.SYSTEM.VALIDATION_ERROR,
            errors: [{
                field: "author",
                message: ERROR_MESSAGES.VALIDATION.POST.AUTHOR.INVALID_FORMAT
            }]
        });
        return;
    }

    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.POST.CREATE_ERROR,
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: SUCCESS_MESSAGES.POST.UPDATED,
      data: {
        post,
      },
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.UPDATE_ERROR, error);

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

    if (error.message === ERROR_MESSAGES.POST.NOT_FOUND) {
        res.status(404).json({
            status: "error",
            message: error.message
        });
        return;
    }

    res.status(500).json({
      status: "error",
      message: ERROR_MESSAGES.POST.UPDATE_ERROR
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).json({
      status: "success",
      message: SUCCESS_MESSAGES.POST.DELETED,
      data: null,
    });
  } catch (error: any) {
    logger.error(ERROR_MESSAGES.POST.DELETE_ERROR, error);
    res.status(error.message === ERROR_MESSAGES.POST.NOT_FOUND ? 404 : 500).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.POST.DELETE_ERROR
    });
  }
};
