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
                        <h2 className="blog-title">{post.title}</h2>
                        <p className="blog-content">
                            {post.content.length > 150
                                ? post.content.substring(0, 150) + "..."
                                : post.content}
                        </p>
                        <div className="post-footer">
                            <div className="footer-btns">
                                <button className="read-more">Read More</button>
                            </div>
                            <div className="footer-metadata">
                                <h3>Author : {post.author.username}</h3>
                                <small>Created At : {post.createdAt}</small>
                                <br />
                                <small>Updated At : {post.updatedAt}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
