import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    function handleLogout() {
        logout();
        setIsMenuOpen(false);
        navigate("/");
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target))
                setIsMenuOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="navbar glass-nav">
            <div className="logo" onClick={() => navigate("/")}>
                <h1>Blog App</h1>
            </div>
            {auth.isLoggedIn ? (
                <div className="nav-btns">
                    <button onClick={toggleTheme}>
                        <i
                            className={
                                theme === "light" ? "bx bx-moon" : "bx bx-sun"
                            }
                        ></i>
                    </button>

                    <div className="user-menu" ref={menuRef}>
                        <button
                            className="avatar-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <i className="bx bx-user-circle"></i>
                        </button>

                        {isMenuOpen && (
                            <div className="dropdown">
                                <div className="user-info">
                                    <strong>{auth.user?.username}</strong>
                                    <small>{auth.user?.email}</small>
                                </div>
                                <hr />
                                <button>Profile</button>
                                <button>Dashboard</button>
                                <hr />
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="nav-btns">
                    <button onClick={toggleTheme}>
                        <i
                            className={
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
