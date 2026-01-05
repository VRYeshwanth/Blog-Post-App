import "./Navbar.css";
import Avatar from "../Avatar/Avatar";
import { useNotification } from "../../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { useLoader } from "../../../context/LoaderContext.jsx";
import axios from "../../utils/axios.js";

export default function Navbar() {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const { showNotification } = useNotification();
    const { theme, toggleTheme } = useTheme();
    const { isLoading, showLoader, hideLoader } = useLoader();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    function handleAccountDeletion() {
        setIsMenuOpen(false);

        showNotification({
            type: "danger",
            title: "Delete Account",
            message:
                "This action is permanent. All your posts, comments and likes will be deleted.",
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: async () => {
                showLoader();
                try {
                    await axios.delete("/api/profile", {
                        withCredentials: true,
                    });

                    showNotification({
                        type: "success",
                        message: "Your account has been deleted successfully.",
                        confirmText: "Ok",
                        onConfirm: () => {
                            logout();
                            navigate("/register");
                        },
                    });
                } catch (err) {
                    showNotification({
                        type: "error",
                        message:
                            err?.response?.data?.message ||
                            "Failed to delete account",
                        confirmText: "Ok",
                    });
                } finally {
                    hideLoader();
                }
            },
        });
    }

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
                        <Avatar
                            username={auth.user?.username}
                            size="46px"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            clickable={true}
                        />

                        {isMenuOpen && (
                            <div className="dropdown">
                                <div className="user-info">
                                    <Avatar username={auth.user?.username} />
                                    <div className="user-details">
                                        <strong>{auth.user?.username}</strong>
                                        <small>{auth.user?.email}</small>
                                    </div>
                                </div>
                                <hr />
                                <button onClick={() => navigate("/profile")}>
                                    Profile
                                </button>
                                <button onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </button>
                                <hr />
                                <button onClick={handleLogout}>Logout</button>
                                <button onClick={handleAccountDeletion}>
                                    Delete Account
                                </button>
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
