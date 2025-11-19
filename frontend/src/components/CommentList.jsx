import { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/comments/${postId}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err));
    }, [postId]);

    return (
        <div className="comment-list">
            {comments.length === 0 ? (
                <div className="display-message">
                    <h1>No Comments</h1>
                    <p>Be the first to add a new comment !!</p>
                    <button>+</button>
                </div>
            ) : (
                comments.map((comment) => <Comment comment={comment} />)
            )}
        </div>
    );
}
