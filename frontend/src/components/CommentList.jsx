import Comment from "./Comment";

export default function CommentList({ comments, showForm, onDelete }) {
    return (
        <div className="comment-list">
            {comments.length === 0 && !showForm ? (
                <div className="display-message">
                    <h1>No Comments</h1>
                    <p>Be the first to add a new comment !!</p>
                </div>
            ) : (
                comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}
