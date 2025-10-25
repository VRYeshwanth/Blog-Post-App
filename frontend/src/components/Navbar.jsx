import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    }

    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
                <h1>Blog App</h1>
            </div>
            {token && userId ? (
                <div className="nav-btns">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="nav-btns">
                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            )}
        </div>
    );
}
