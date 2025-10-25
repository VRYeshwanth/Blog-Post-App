import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

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
            alert("Registration Successfull !!");

            navigate("/login");
        } catch (err) {
            alert(err.response.data.error);
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
