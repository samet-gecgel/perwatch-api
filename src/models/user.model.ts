import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IUserMethods, IUserModel } from "../types/user.interface";
import { logger } from "../utils/logger";
import { ERROR_MESSAGES } from "../constants/messages";

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, ERROR_MESSAGES.VALIDATION.USER.NAME.REQUIRED],
    },
    email: {
      type: String,
      required: [true, ERROR_MESSAGES.VALIDATION.USER.EMAIL.REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: ERROR_MESSAGES.VALIDATION.USER.EMAIL.INVALID,
      },
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.VALIDATION.USER.PASSWORD.REQUIRED],
      minlength: [6, ERROR_MESSAGES.VALIDATION.USER.PASSWORD.MIN],
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { 
        virtuals: true ,
        transform: function(doc, ret){
            if (ret.createdAt) {
                ret.createdAt = new Date(new Date(ret.createdAt).getTime() + (3 * 60 * 60 * 1000));
              }
              if (ret.updatedAt) {
                ret.updatedAt = new Date(new Date(ret.updatedAt).getTime() + (3 * 60 * 60 * 1000));
              }
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true },
  }
);

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(userPassword, this.password);
    } catch (error) {
        logger.error(ERROR_MESSAGES.USER.PASSWORD_COMPARE_ERROR, error);
        return false;
    }
};

userSchema.statics.findByEmail = function (email: string){
    return this.findOne({email});
}

const User = model<IUser, IUserModel>("User", userSchema);

export default User;



