import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

export default function App() {
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.clear();
                alert("Session expired. Please log in again.");
                window.location.href = "#/login";
            }
        } catch (err) {
            localStorage.clear();
            window.location.href = "#/login";
        }
    }, []);
    return (
        <HashRouter>
            <Navbar />
            <Notification />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/edit/:id" element={<EditPost />} />
            </Routes>
        </HashRouter>
    );
}
