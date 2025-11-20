import { formatTime } from "../../utils/FormatTime";
export default function Comment({ comment }) {
    return (
        <div className="comment">
            <div className="header">
                <div className="username">
                    <h3>{comment.userId.username}</h3>
                </div>
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
