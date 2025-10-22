import Post from "../models/Post.js"

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({"Error": err.message});
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const response = await Post.create({title: title, content: content, author: req.userId});

        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({"Error": err.message});
    }
}