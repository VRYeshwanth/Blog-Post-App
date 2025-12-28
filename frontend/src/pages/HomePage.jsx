import axios from "../utils/axios.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { usePosts } from "../../context/PostsContext";
import { useLoader } from "../../context/LoaderContext.jsx";

export default function HomePage() {
    const { posts, setAllPosts, deletePost, editPost } = usePosts();
    const { auth } = useAuth();
    const { showNotification } = useNotification();
    const { isLoading, showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();

    const toggleLikes = async (id) => {
        try {
            const response = await axios.patch(`/api/posts/${id}/like`);

            editPost(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        showLoader();
        try {
            await axios.delete(`/api/posts/${id}`);
            deletePost(id);
            showNotification("Post Deleted Successfully !!", "success");
        } catch (err) {
            showNotification(err?.message, "error", () => navigate("/"));
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            showLoader();
            try {
                const res = await axios.get("/api/posts");
                setAllPosts(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                hideLoader();
            }
        };

        fetchPosts();
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
                                    disabled={isLoading}
                                    onClick={() =>
                                        navigate(`/posts/${post._id}`)
                                    }
                                >
                                    Read More
                                </button>
                                {post.author._id === auth.userId && (
                                    <div className="edit-btns">
                                        <button
                                            className="icon-btn"
                                            disabled={isLoading}
                                            onClick={() =>
                                                navigate(
                                                    `/posts/edit/${post._id}`
                                                )
                                            }
                                        >
                                            <i className="bx bx-edit"></i>
                                        </button>
                                        <button
                                            className="icon-btn"
                                            disabled={isLoading}
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                        >
                                            <i className="bx bx-trash"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="footer-metadata">
                                <div className="group">
                                    <h3>Author : {post.author.username}</h3>
                                    <div className="likes">
                                        <button
                                            className="like-button"
                                            disabled={isLoading}
                                            onClick={() =>
                                                toggleLikes(post._id)
                                            }
                                        >
                                            <i
                                                className={
                                                    post.likes.some(
                                                        (id) =>
                                                            id.toString() ===
                                                            auth.userId
                                                    )
                                                        ? "bx bxs-like"
                                                        : "bx bx-like"
                                                }
                                            ></i>
                                        </button>
                                        <span>{post.likes.length}</span>
                                    </div>
                                </div>
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
                    <button onClick={() => navigate("/posts/create")}>+</button>
                </div>
            )}
        </div>
    );
}
