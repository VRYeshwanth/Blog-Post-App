import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: !!localStorage.getItem("token"),
        userId: localStorage.getItem("userId") || null,
    });

    const login = (token, userId) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setAuth({ isLoggedIn: true, userId });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setAuth({ isLoggedIn: false, userId: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
