import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/api/auth/login`,
                { email: email, password: password }
            );

            const token = response.data.token;
            const userId = response.data.user.id;

            login(token, userId);

            alert("Login Successful !!");

            navigate("/");
        } catch (err) {
            alert(err.response.data.error);
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
