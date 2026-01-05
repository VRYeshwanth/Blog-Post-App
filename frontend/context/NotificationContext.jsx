import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: "",
        type: "info",
        title: null,
        onConfirm: null,
        confirmText: null,
        cancelText: null,
    });

    const showNotification = ({
        message,
        type = "info",
        title = null,
        onConfirm = null,
        confirmText = null,
        cancelText = null,
    }) => {
        setNotification({
            message,
            type,
            title,
            onConfirm,
            confirmText,
            cancelText,
        });
    };

    const closeNotification = () => {
        setNotification({
            message: "",
            type: "info",
            title: null,
            onConfirm: null,
            confirmText: null,
            cancelText: null,
        });
    };

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification, closeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
