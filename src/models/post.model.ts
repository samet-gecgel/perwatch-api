import { model, Schema } from "mongoose";
import { IPost, IPostModel } from "../types/post.interface";
import { ERROR_MESSAGES } from "../constants/messages";
const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: [true, ERROR_MESSAGES.VALIDATION.POST.TITLE.REQUIRED],
        trim: true,
        minlength: [3, ERROR_MESSAGES.VALIDATION.POST.TITLE.MIN],
        maxlength: [100, ERROR_MESSAGES.VALIDATION.POST.TITLE.MAX],
    },
    content: {
        type: String,
        required: [true, ERROR_MESSAGES.VALIDATION.POST.CONTENT.REQUIRED],
        trim: true,
        minlength: [10, ERROR_MESSAGES.VALIDATION.POST.CONTENT.MIN],
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
            required: [true, ERROR_MESSAGES.VALIDATION.POST.AUTHOR.REQUIRED],
    },
    tags: [{
        type: String,
        trim: true,
        required: [true, ERROR_MESSAGES.VALIDATION.POST.TAGS.REQUIRED],
    }]
},{
    timestamps: true,
    toJSON:{
        virtuals:true,
        transform: function(doc, ret) {
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
    }
})

postSchema.statics.findByAuthor = function(authorId: string) {
    return this.find({ author: authorId }).populate('author', 'name email');
};

postSchema.statics.findByTag = function(tag: string) {
    return this.find({ tags: tag }).populate('author', 'name email');
};

const Post = model<IPost, IPostModel>("Post", postSchema);

export default Post;

