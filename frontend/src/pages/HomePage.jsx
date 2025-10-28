import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const { auth } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            showNotification("Post Deleted Successfully !!", "success");
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } catch (err) {
            showNotification(err?.message, "error", () => navigate("/"));
        }
    };

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
                                <button
                                    className="read-more"
                                    onClick={() =>
                                        navigate(`/posts/${post._id}`)
                                    }
                                >
                                    Read More
                                </button>
                                {post.author._id == auth.userId && (
                                    <div className="edit-btns">
                                        <i className="bx bx-edit"></i>
                                        <i
                                            className="bx bx-trash"
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                        ></i>
                                    </div>
                                )}
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
            {auth.isLoggedIn && (
                <div className="add-btn">
                    <button>+</button>
                </div>
            )}
        </div>
    );
}
