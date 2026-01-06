import "./PostDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNotification } from "../../../context/NotificationContext.jsx";
import { usePosts } from "../../../context/PostsContext.jsx";
import { useLoader } from "../../../context/LoaderContext.jsx";
import CommentList from "../../components/Comment/CommentList.jsx";
import axios from "../../utils/axios.js";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { auth } = useAuth();
    const { isLoading, showLoader, hideLoader } = useLoader();
    const { posts, deletePost } = usePosts();
    const [post, setPost] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);

    const handleDelete = async (id) => {
        showLoader();
        try {
            await axios.delete(`/api/posts/${id}`);
            deletePost(id);
            showNotification({
                title: "Post Deleted",
                message: "The post has been deleted.",
                type: "success",
                confirmText: "Ok",
                onConfirm: () => navigate("/"),
            });
        } catch (err) {
            showNotification({
                title: "Deletion Failed",
                message: err?.message || "Something went wrong",
                type: "error",
                confirmText: "Ok",
                onConfirm: () => navigate("/"),
            });
        } finally {
            hideLoader();
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        showLoader();
        try {
            await axios.post("/api/comments", {
                text,
                postId: post._id,
            });

            const updated = await axios.get(`/api/comments/${post._id}`);
            setComments(updated.data);
            setText("");
            setShowForm(false);
        } catch (err) {
            console.log(err);
        } finally {
            hideLoader();
        }
    };

    const handleDeleteComment = async (id) => {
        showLoader();
        try {
            await axios.delete(`/api/comments/${id}`);

            setComments((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            hideLoader();
        }
    };

    const handleEditComment = async (newText, id, e) => {
        showLoader();
        try {
            const response = await axios.patch(`/api/comments/${id}`, {
                text: newText,
            });

            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === response.data._id ? response.data : comment
                )
            );
        } catch (err) {
            console.log(err);
        } finally {
            hideLoader();
        }
    };

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

    useEffect(() => {
        if (!post._id) return;

        const fetchComments = async () => {
            showLoader();
            try {
                const res = await axios.get(`/api/comments/${post._id}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                hideLoader();
            }
        };

        fetchComments();
    }, [post._id]);

    return (
        <div className="post-page">
            <div className="back-btn-holder">
                <button
                    className="back-btn"
                    disabled={isLoading}
                    onClick={() => navigate("/")}
                >
                    <i className="bx bx-arrow-back"></i>
                </button>
            </div>
            <div className="post-view">
                <div className="post-header">
                    <div className="left">
                        <h2>{post.title}</h2>
                    </div>
                    {post?.author?._id === auth.user?.id && (
                        <div className="right">
                            <div className="edit-btns">
                                <button
                                    className="icon-btn"
                                    disabled={isLoading}
                                    onClick={() =>
                                        navigate(`/posts/edit/${post._id}`)
                                    }
                                >
                                    <i className="bx bx-edit"></i>
                                </button>
                                <button
                                    className="icon-btn"
                                    disabled={isLoading}
                                    onClick={() => handleDelete(post._id)}
                                >
                                    <i className="bx bx-trash"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p>{post.content}</p>
                <small>Created At : {post.createdAt}</small>
                <br />
                <small>Updated At : {post.updatedAt}</small>
            </div>
            <div className="comment-view">
                <div className="comment-view-heading">
                    <h1 className="comment-heading">Comments</h1>
                    {auth.user?.id && (
                        <button onClick={() => setShowForm(!showForm)}>
                            +
                        </button>
                    )}
                </div>
                {showForm && (
                    <form onSubmit={handleAddComment}>
                        <textarea
                            placeholder="Enter your comment : "
                            required
                            value={text}
                            disabled={isLoading}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button type="submit" disabled={isLoading}>
                            Post
                        </button>
                    </form>
                )}
                <CommentList
                    comments={comments}
                    showForm={showForm}
                    onDelete={handleDeleteComment}
                    onEdit={handleEditComment}
                />
            </div>
        </div>
    );
}
