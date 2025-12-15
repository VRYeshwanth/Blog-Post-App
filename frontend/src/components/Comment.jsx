import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatTime } from "../utils/formatTime";
export default function Comment({ comment, onDelete, onEdit }) {
    const { auth } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);

    return (
        <div className="comment">
            <div className="header">
                <div className="username">
                    <h3>{comment.userId.username}</h3>
                </div>
                {auth.userId === comment.userId._id && (
                    <div className="header-btns">
                        <i
                            className="bx bx-edit"
                            onClick={() => setEditMode(!editMode)}
                        ></i>
                        <i
                            className="bx bx-trash"
                            onClick={() => onDelete(comment._id)}
                        ></i>
                    </div>
                )}
            </div>
            <div className="body">
                {editMode ? (
                    <div className="form-box">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onEdit(editedText, comment._id);
                                setEditMode(!editMode);
                            }}
                        >
                            <textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                            ></textarea>
                            <div className="form-btns">
                                <button type="submit">
                                    <i class="bx bx-save"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditMode(!editMode)}
                                >
                                    <i class="bx bx-x"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p>{comment.text}</p>
                )}
            </div>
            <div className="footer">
                <small>{formatTime(comment.createdAt)}</small>
            </div>
        </div>
    );
}
