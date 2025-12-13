import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import axios from "../utils/axios.js";

export default function Login() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(e) {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });

            const token = response.data.token;
            const userId = response.data.user.id;

            login(token, userId);

            showNotification("Login Successful !!", "success", () =>
                navigate("/")
            );
        } catch (err) {
            showNotification(err.response.data.error, "error", () =>
                navigate("/login")
            );
        }
    }

    return (
        <div className="page-container">
            <div className="login-box">
                <h1>Login</h1>
                <form method="post" onSubmit={loginUser} className="login-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email address : "
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password : "
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
