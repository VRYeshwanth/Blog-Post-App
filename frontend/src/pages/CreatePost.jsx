import { useNavigate } from "react-router-dom";
export default function CreatePost() {
    const navigate = useNavigate();

    return (
        <div className="create-post-page">
            <div className="back-btn-holder">
                <button className="back-btn" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
            <div className="create-view">
                <h1 className="create-form-heading">Add new post</h1>
                <form method="post" className="create-form">
                    <input
                        type="text"
                        placeholder="Enter the title of the post :"
                    />
                    <textarea placeholder="Enter the content of your post :"></textarea>
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
}
