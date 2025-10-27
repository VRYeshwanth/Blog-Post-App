import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/posts/${id}`)
            .then((res) => setPost(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="post-page">
            <div className="post-view">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>{post.createdAt}</small>
                <small>{post.updatedAt}</small>
            </div>
        </div>
    );
}
