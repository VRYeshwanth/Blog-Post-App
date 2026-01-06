import "./EditPost.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../../context/PostsContext.jsx";
import { useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext.jsx";
import { useLoader } from "../../../context/LoaderContext.jsx";
import axios from "../../utils/axios.js";

export default function EditPost() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { isLoading, showLoader, hideLoader } = useLoader();
    const { id } = useParams();
    const { posts, editPost, insertPost } = usePosts();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const foundPost = posts.find((p) => p._id === id);

            if (foundPost) {
                setPost(foundPost);
                return;
            }

            showLoader();
            try {
                const res = await axios.get(`/api/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                hideLoader();
            }
        };

        fetchPost();
    }, [id, posts]);

    const handleEdit = async (e) => {
        e.preventDefault();
        showLoader();
        try {
            const res = await axios.patch(`/api/posts/${id}`, post);

            editPost(res.data);
            showNotification({
                title: "Post Updated",
                message: "Your changes have been saved.",
                type: "success",
                confirmText: "Ok",
                onConfirm: () => navigate("/"),
            });
        } catch (err) {
            showNotification({
                title: "Update Failed",
                message: err?.message || "Something went wrong",
                type: "error",
                confirmText: "Ok",
                onConfirm: () => navigate("/"),
            });
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="edit-post-page">
            <div className="back-btn-holder">
                <button
                    className="back-btn"
                    disabled={isLoading}
                    onClick={() => navigate("/")}
                >
                    <i className="bx bx-arrow-back"></i>
                </button>
            </div>
            <div className="edit-view">
                <h1 className="edit-form-heading">Edit Post</h1>
                <form method="post" className="edit-form" onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={post.title}
                        disabled={isLoading}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                    />
                    <textarea
                        value={post.content}
                        disabled={isLoading}
                        onChange={(e) =>
                            setPost({ ...post, content: e.target.value })
                        }
                    ></textarea>
                    <button type="submit" disabled={isLoading}>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
}
