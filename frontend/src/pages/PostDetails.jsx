import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { usePosts } from "../../context/PostsContext";
import axios from "axios";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { auth } = useAuth();
    const { posts, deletePost } = usePosts();
    const [post, setPost] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            deletePost(id);
            showNotification("Post Deleted Successfully !!", "success", () =>
                navigate("/")
            );
        } catch (err) {
            showNotification(err?.message, "error", () => navigate("/"));
        }
    };

    useEffect(() => {
        const foundPost = posts.find((p) => p._id === id);
        if (foundPost) {
            setPost(foundPost);
        } else {
            axios
                .get(`http://localhost:3000/api/posts/${id}`)
                .then((res) => setPost(res.data))
                .catch((err) => console.log(err));
        }
    }, [id, posts]);

    return (
        <div className="post-page">
            <div className="back-btn-holder">
                <button className="back-btn" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
            <div className="post-view">
                <div className="post-header">
                    <div className="left">
                        <h2>{post.title}</h2>
                    </div>
                    {post?.author?._id == auth.userId && (
                        <div className="right">
                            <div className="edit-btns">
                                <i
                                    className="bx bx-edit"
                                    onClick={() =>
                                        navigate(`/posts/edit/${post._id}`)
                                    }
                                ></i>
                                <i
                                    className="bx bx-trash"
                                    onClick={() => handleDelete(post._id)}
                                ></i>
                            </div>
                        </div>
                    )}
                </div>
                <p>{post.content}</p>
                <small>Created At : {post.createdAt}</small>
                <br />
                <small>Updated At : {post.updatedAt}</small>
            </div>
        </div>
    );
}
