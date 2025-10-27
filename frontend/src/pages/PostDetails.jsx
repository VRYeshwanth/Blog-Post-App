import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/posts/${id}`)
            .then((res) => setPost(res.data))
            .catch((err) => console.log(err));
    }, [id]);

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
                                <i className="bx bx-edit"></i>
                                <i className="bx bx-trash"></i>
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
