import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Notification from "./components/Notification/Notification";
import PostDetails from "./pages/PostDetails/PostDetails";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </HashRouter>
    );
}
