import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/auth/register`,
                { username: username, email: email, password: password }
            );

            showNotification("Registration Successful !!", "success", () =>
                navigate("/login")
            );
        } catch (err) {
            showNotification(err.response.data.error, "error", () =>
                navigate("/register")
            );
        }
    }

    return (
        <div className="page-container">
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
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Enter your Username : "
                        required
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Enter your email address : "
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Enter your password : "
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
