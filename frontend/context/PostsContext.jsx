import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const setAllPosts = (fetchedPosts) => {
        setPosts(fetchedPosts);
    };

    const insertPost = (newPost) => {
        setPosts((prev) => [...prev, newPost]);
    };

    const editPost = (editedPost) => {
        setPosts((prev) =>
            prev.map((post) =>
                post._id === editedPost._id ? editedPost : post
            )
        );
    };

    const deletePost = (id) => {
        setPosts((prev) => prev.filter((post) => post._id !== id));
    };

    return (
        <PostsContext.Provider
            value={{ posts, setAllPosts, insertPost, editPost, deletePost }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
