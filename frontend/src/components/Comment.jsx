import { useAuth } from "../../context/AuthContext";
import { formatTime } from "../../utils/FormatTime";
export default function Comment({ comment }) {
    const { auth } = useAuth();

    return (
        <div className="comment">
            <div className="header">
                <div className="username">
                    <h3>{comment.userId.username}</h3>
                </div>
                {auth.userId === comment.userId._id && (
                    <div className="header-btns">
                        <i className="bx bx-edit"></i>
                        <i className="bx bx-trash"></i>
                    </div>
                )}
            </div>
            <div className="body">
                <p>{comment.text}</p>
            </div>
            <div className="footer">
                <small>{formatTime(comment.createdAt)}</small>
            </div>
        </div>
    );
}
