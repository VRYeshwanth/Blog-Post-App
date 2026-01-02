import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext.jsx";
import { useLoader } from "../../../context/LoaderContext.jsx";
import axios from "../../utils/axios.js";

export default function Register() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { isLoading, showLoader, hideLoader } = useLoader();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(e) {
        e.preventDefault();
        showLoader();
        try {
            const response = await axios.post("/api/auth/register", {
                username,
                email,
                password,
            });

            showNotification("Registration Successful !!", "success", () =>
                navigate("/login")
            );
        } catch (err) {
            showNotification(err?.response?.data?.error, "error", () =>
                navigate("/register")
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
            <div className="register-box">
                <h1>Register</h1>
                <form
                    method="post"
                    onSubmit={registerUser}
                    className="register-form"
                >
                    <input
                        type="text"
                        value={username}
                        disabled={isLoading}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Enter your Username : "
                        required
                    />

                    <input
                        type="email"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Enter your email address : "
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        disabled={isLoading}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Enter your password : "
                        required
                    />

                    <button type="submit" disabled={isLoading}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
