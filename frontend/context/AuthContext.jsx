import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: !!localStorage.getItem("token"),
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setAuth({
                isLoggedIn: true,
                user: JSON.parse(user),
            });
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setAuth({ isLoggedIn: true, user });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setAuth({ isLoggedIn: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
