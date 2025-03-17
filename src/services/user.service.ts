import User from "../models/user.model";
import { IUser } from "../types/user.interface";
import { logger } from "../utils/logger";
import bcrypt from "bcryptjs";
import { ERROR_MESSAGES } from "../constants/messages";
export class UserService {
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      logger.error(ERROR_MESSAGES.USER.GET_ERROR, error);
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error(ERROR_MESSAGES.USER.NOT_FOUND);
      }
      return user;
    } catch (error) {
      logger.error(ERROR_MESSAGES.USER.GET_ERROR, error);
      throw error;
    }
  }

  async createUser(userData: Partial<IUser>) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error(ERROR_MESSAGES.VALIDATION.USER.EMAIL.EXISTS);
      }
      return await User.create(userData);
    } catch (error) {
      logger.error(ERROR_MESSAGES.USER.CREATE_ERROR, error);
      throw error;
    }
  }

  async updateUser(id: string, updateData: Partial<IUser>) {
    try {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser) {
        throw new Error(ERROR_MESSAGES.VALIDATION.USER.EMAIL.EXISTS);
      }
      
      const user = await User.findById(id).select("+password");
      if (!user) {
        throw new Error(ERROR_MESSAGES.USER.NOT_FOUND);
      }
      
      if (updateData.password) {
        const isSamePassword = await bcrypt.compare(
          updateData.password,
          user.password
        );
        if (isSamePassword) {
          throw new Error(ERROR_MESSAGES.VALIDATION.USER.PASSWORD.SAME);
        }

        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (error) {
      logger.error(ERROR_MESSAGES.USER.UPDATE_ERROR, error);
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error(ERROR_MESSAGES.USER.NOT_FOUND);
      }
      return user;
    } catch (error) {
      logger.error(ERROR_MESSAGES.USER.DELETE_ERROR, error);
      throw error;
    }
  }
}

export const userService = new UserService();
