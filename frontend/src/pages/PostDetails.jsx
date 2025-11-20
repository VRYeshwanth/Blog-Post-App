import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { usePosts } from "../../context/PostsContext";
import CommentList from "../components/CommentList";
import axios from "axios";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { auth } = useAuth();
    const { posts, deletePost } = usePosts();
    const [post, setPost] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);

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

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:3000/api/comments/`,
                {
                    text: text,
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            const updated = await axios.get(
                `http://localhost:3000/api/comments/${post._id}`
            );
            setComments(updated.data);
            setText("");
            setShowForm(false);
        } catch (err) {
            console.log(err);
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

    useEffect(() => {
        if (!post._id) return;

        axios
            .get(`http://localhost:3000/api/comments/${post._id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err));
    }, [post._id]);

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
            <div className="comment-view">
                <div className="comment-view-heading">
                    <h1 className="comment-heading">Comments</h1>
                    {auth.userId && (
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
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button type="submit">Post</button>
                    </form>
                )}
                <CommentList comments={comments} showForm={showForm} />
            </div>
        </div>
    );
}
