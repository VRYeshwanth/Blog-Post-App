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
        const { text, postId } = req.body;

        if (!text || !postId)
            return res
                .status(400)
                .json({ error: "All fields must be present !!" });

        const newComment = await Comment.create({
            text: text,
            userId: req.user.id,
            postId: postId,
        });

        return res.status(201).json(newComment);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const editComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params;

        const existingComment = await Comment.findOne({ _id: id });

        if (!existingComment)
            return res.status(400).json({ error: "No Comment found !!" });

        if (existingComment.userId.toString() !== req.user.id)
            return res.status(400).json({ error: "Access Denied !!" });

        existingComment.text = text;

        await existingComment.save();

        const populatedComment = await existingComment.populate("userId");
        return res.status(201).json(populatedComment);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const existingComment = await Comment.findOne({ _id: id });

        if (existingComment.userId.toString() !== req.user.id)
            return res.status(400).json({ error: "Access Denied !!" });

        await Comment.deleteOne({ _id: id });

        return res
            .status(200)
            .json({ success: "Comment successfully deleted !!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
