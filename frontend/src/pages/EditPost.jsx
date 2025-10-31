import { useNavigate } from "react-router-dom";

export default function EditPost() {
    const navigate = useNavigate();

    return (
        <div className="edit-post-page">
            <div className="back-btn-holder">
                <button className="back-btn" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
            <div className="edit-view">
                <h1 className="edit-form-heading">Edit Post</h1>
                <form method="post" className="edit-form">
                    <input type="text" />
                    <textarea></textarea>
                    <button>Edit</button>
                </form>
            </div>
        </div>
    );
}
