import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: "",
        type: "info",
        onClose: null,
    });

    const showNotification = (message, type = "info", onClose = null) => {
        setNotification({
            message: message,
            type: type,
            onClose: onClose,
        });
    };

    const closeNotification = () => {
        if (notification.onClose) notification.onClose();
        setNotification({ message: "", type: "info", onClose: null });
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
