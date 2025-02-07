import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    blogid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog',

    },
},{timestamps: true})
likeSchema.index({ user: 1, blogid: 1 }, { unique: true });

const BlogLike = mongoose.model('BlogLike', likeSchema)
export default BlogLike