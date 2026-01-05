import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getProfileDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("username email");

        if (!user)
            return res.status(404).json({ message: "Profile not found !!" });

        return res.status(200).json({
            message: "Profile details fetched !!",
            details: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateProfileDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;

        const user = await User.findById(userId);

        if (!user)
            return res.status(404).json({ message: "Profile not found" });

        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully !!",
            details: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found !!" });

        await Post.updateMany({ likes: userId }, { $pull: { likes: userId } });
        await Comment.deleteMany({ userId: userId });
        await Post.deleteMany({ author: userId });
        await User.deleteOne({ _id: userId });

        return res
            .status(200)
            .json({ message: "Account successfully deleted" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
