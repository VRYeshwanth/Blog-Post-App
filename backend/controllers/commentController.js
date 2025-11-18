import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId: postId })
            .populate("userId", "username")
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { text, userId, postId } = req.body;

        if (!text || !userId || !postId)
            return res
                .status(400)
                .json({ error: "All fields must be present !!" });

        const newComment = await Comment.create({
            text: text,
            userId: userId,
            postId: postId,
        });

        return res.status(201).json(newComment);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
