import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/auth/login`, {email: email, password: password});

            const token = response.data.token;
            const userId = response.data.user.id;
            
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            alert("Login Successful !!");
        } catch (err) {
            alert(err.response.data.error);
        }
    }
    
    return (
        <div className="login-box">
            <h1>Login</h1>
            <form method="post" onSubmit={loginUser}>
                <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email address : " required />

                <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password : " required />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}