import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    updatedAt: Date,
});

postSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
