import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username").exec();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};

export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await Post.findById(id)
            .populate("author", "username")
            .exec();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const response = await Post.create({
            title: title,
            content: content,
            author: req.user.id,
        });

        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const existingPost = await Post.findOne({ _id: id });

        if (!existingPost)
            return res.status(404).json({ error: "Post not found!!" });

        if (existingPost.author.toString() !== req.user.id)
            return res.status(400).json({ error: "Access Denied !!" });

        existingPost.title = title;
        existingPost.content = content;

        await existingPost.save();

        res.status(201).json(existingPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const existingPost = await Post.findById(id);

        if (!existingPost)
            return res.status(404).json({ error: "Post not found" });

        if (existingPost.author.toString() !== req.user.id)
            return res.status(403).json({ error: "Access Denied !!" });

        await Comment.deleteMany({ postId: id });

        await Post.deleteOne({ _id: id });

        res.status(200).json({ success: "Post deleted successfully !!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const handleLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const existingPost = await Post.findOne({ _id: id });

        if (existingPost.likes.includes(userId)) {
            existingPost.likes = existingPost.likes.filter(
                (id) => id.toString() !== userId
            );
        } else {
            existingPost.likes.push(userId);
        }

        await existingPost.populate("author");

        await existingPost.save();

        res.status(200).json(existingPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
