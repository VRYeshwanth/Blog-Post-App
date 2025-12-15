import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/PostsContext";
import { useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import axios from "../utils/axios.js";

export default function EditPost() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { id } = useParams();
    const { posts, editPost, insertPost } = usePosts();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const foundPost = posts.find((p) => p._id === id);
        if (foundPost) {
            setPost(foundPost);
        } else {
            axios
                .get(`/api/posts/${id}`)
                .then((res) => setPost(res.data))
                .catch((err) => console.log(err));
        }
    }, [id, posts]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`/api/posts/${id}`, post);

            editPost(res.data);
            showNotification("Post edited successfully !!", "success", () =>
                navigate("/")
            );
        } catch (err) {
            showNotification(err?.message, "error", () => navigate("/"));
        }
    };

    return (
        <div className="edit-post-page">
            <div className="back-btn-holder">
                <button className="back-btn" onClick={() => navigate("/")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </button>
            </div>
            <div className="edit-view">
                <h1 className="edit-form-heading">Edit Post</h1>
                <form method="post" className="edit-form" onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                    />
                    <textarea
                        value={post.content}
                        onChange={(e) =>
                            setPost({ ...post, content: e.target.value })
                        }
                    ></textarea>
                    <button>Edit</button>
                </form>
            </div>
        </div>
    );
}
