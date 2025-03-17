import { Model } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMethods {
    comparePassword(userPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods>{
    findByEmail(email: string): Promise<IUser | null>
}