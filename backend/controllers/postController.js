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

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const existingPost = await Post.findOne({_id: id});

        if(!existingPost) return res.status(400).json({"error": "Post not found!!"})

        if(existingPost.author.toString() !== req.userId) return res.status(400).json({"error": "Access Denied !!"});

        existingPost.title = title;
        existingPost.content = content;

        await existingPost.save();

        res.status(201).json(existingPost);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
}