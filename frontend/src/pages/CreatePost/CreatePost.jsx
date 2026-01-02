import "./CreatePost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext.jsx";
import { usePosts } from "../../../context/PostsContext.jsx";
import { useLoader } from "../../../context/LoaderContext.jsx";
import axios from "../../utils/axios.js";

export default function CreatePost() {
    const navigate = useNavigate();
    const { insertPost } = usePosts();
    const { showNotification } = useNotification();
    const { isLoading, showLoader, hideLoader } = useLoader();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePostCreation = async (postTitle, postContent) => {
        showLoader();
        try {
            const response = await axios.post("/api/posts", {
                title: postTitle,
                content: postContent,
            });

            insertPost(response.data);

            showNotification("Post Successfully Created !!", "success", () =>
                navigate("/")
            );
        } catch (err) {
            showNotification(err?.message, "error", () => navigate("/"));
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="create-post-page">
            <div className="back-btn-holder">
                <button
                    className="back-btn"
                    disabled={isLoading}
                    onClick={() => navigate("/")}
                >
                    <i className="bx bx-arrow-back"></i>
                </button>
            </div>
            <div className="create-view">
                <h1 className="create-form-heading">Add new post</h1>
                <form
                    method="post"
                    className="create-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handlePostCreation(title, content);
                    }}
                >
                    <input
                        type="text"
                        value={title}
                        disabled={isLoading}
                        placeholder="Enter the title of the post :"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        value={content}
                        disabled={isLoading}
                        placeholder="Enter the content of your post :"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={isLoading}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
