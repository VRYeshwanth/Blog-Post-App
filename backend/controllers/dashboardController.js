import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

export const getDashboardDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(userId)
            .select("username createdAt")
            .lean();

        if (!user)
            return res.status(404).json({ message: "User not found !!" });

        const postsCount = await Post.countDocuments({ author: userObjectId });
        const commentsCount = await Comment.countDocuments({
            userId: userObjectId,
        });
        const likesCount = await Post.countDocuments({ likes: userObjectId });

        res.status(200).json({
            user: {
                id: userId,
                username: user.username,
                joinedAt: user.createdAt,
            },
            stats: {
                posts: postsCount,
                comments: commentsCount,
                totalLikes: likesCount,
            },
        });
    } catch (err) {
        console.log("Error : " + err);

        res.status(500).json({
            message: "Failed to load dashboard details !!",
        });
    }
};
