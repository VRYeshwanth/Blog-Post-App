import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext.jsx";
import axios from "../utils/axios.js";

export default function Login() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { isLoading, showLoader, hideLoader } = useLoader();

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(e) {
        e.preventDefault();

        showLoader();
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });

            const { token, user } = response.data;
            login(token, user);

            showNotification("Login Successful !!", "success", () =>
                navigate("/")
            );
        } catch (err) {
            showNotification(err?.response?.data?.error, "error", () =>
                navigate("/login")
            );
        } finally {
            hideLoader();
        }
    }

    return (
        <div className="page-container">
            <button
                className="back-btn"
                disabled={isLoading}
                onClick={() => navigate("/")}
            >
                <i className="bx bx-arrow-back"></i>
            </button>
            <div className="login-box">
                <h1>Login</h1>
                <form method="post" onSubmit={loginUser} className="login-form">
                    <input
                        type="email"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email address : "
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password : "
                        required
                    />

                    <button type="submit" disabled={isLoading}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
