import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

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

    return (
        <PostsContext.Provider value={{ posts, insertPost, editPost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
