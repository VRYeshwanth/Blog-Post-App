import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
                <h1>Blog App</h1>
            </div>
            <div className="nav-btns">
                <button onClick={() => navigate("/register")}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    );
}