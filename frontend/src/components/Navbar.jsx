import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="navbar glass-nav">
            <div className="logo" onClick={() => navigate("/")}>
                <h1>Blog App</h1>
            </div>
            {auth.isLoggedIn ? (
                <div className="nav-btns">
                    <button onClick={toggleTheme}>
                        <i
                            class={
                                theme === "light" ? "bx bx-moon" : "bx bx-sun"
                            }
                        ></i>
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="nav-btns">
                    <button onClick={toggleTheme}>
                        <i
                            class={
                                theme === "light" ? "bx bx-moon" : "bx bx-sun"
                            }
                        ></i>
                    </button>
                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            )}
        </div>
    );
}
