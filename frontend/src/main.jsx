import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { NotificationProvider } from "../context/NotificationContext.jsx";
import { PostsProvider } from "../context/PostsContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <NotificationProvider>
                <PostsProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </PostsProvider>
            </NotificationProvider>
        </AuthProvider>
    </React.StrictMode>
);
