import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/posts")
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="home-page">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post._id}>
                        <h1 className="blog-title">{post.title}</h1>
                        <p className="blog-content">{post.content}</p>
                        <div className="post-footer">
                            <div className="author-placeholder">
                                <h3>Author: {post.author}</h3>
                            </div>
                            <div className="timestamps">
                                <h3>Created At: {post.createdAt}</h3>
                                <h3>Updated At: {post.updatedAt}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
