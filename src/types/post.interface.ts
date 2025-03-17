import { Types, Model } from "mongoose";

export interface IPost {
    title: string;
    content: string;
    author: Types.ObjectId;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostModel extends Model<IPost> {
    findByAuthor(author: string): Promise<IPost[]>;
    findByTag(tag: string): Promise<IPost[]>;
}