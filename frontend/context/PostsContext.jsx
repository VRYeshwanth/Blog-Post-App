import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const insertPost = (newPost) => {
        setPosts((prev) => [...prev, newPost]);
    };

    return (
        <PostsContext.Provider value={{ posts, insertPost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
