import Post from "../models/post.model";
import User from "../models/user.model";
import { IPost } from "../types/post.interface";
import { logger } from "../utils/logger";
import { ERROR_MESSAGES } from "../constants/messages";

export class PostService {
    async getAllPosts() {
        try {
            return await Post.find();
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
            throw error;
        }
    }

    async getPostsByUser(userId: string) {
        try {
            const posts = await Post.find({ author: userId });
            if (posts.length === 0) {
                throw new Error(ERROR_MESSAGES.USER.NOT_FOUND);
            }
            return posts;
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
            throw error;
        }
    }

    async getPostsByTag(tag: string) {
        try {
            const posts = await Post.find({ tags: tag });
            if (posts.length === 0) {
                throw new Error(ERROR_MESSAGES.POST.NOT_FOUND_FOR_TAG);
            }
            return posts;
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
            throw error;
        }
    }

    async getPostById(id: string) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST.NOT_FOUND);
            }
            return post;
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.GET_ERROR, error);
            throw error;
        }
    }

    async createPost(postData: Partial<IPost>) {
        try {
            const userExists = await User.exists({ _id: postData.author });
            if (!userExists) {
                throw new Error(ERROR_MESSAGES.USER.NOT_FOUND);
            }
            
            return await Post.create(postData);
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.CREATE_ERROR, error);
            throw error;
        }
    }

    async updatePost(id: string, updateData: Partial<IPost>) {
        try {
            const post = await Post.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST.NOT_FOUND);
            }
            return post;
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.UPDATE_ERROR, error);
            throw error;
        }
    }

    async deletePost(id: string) {
        try {
            const post = await Post.findByIdAndDelete(id);
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST.NOT_FOUND);
            }
            return post;
        } catch (error) {
            logger.error(ERROR_MESSAGES.POST.DELETE_ERROR, error);
            throw error;
        }
    }
}

export const postService = new PostService();