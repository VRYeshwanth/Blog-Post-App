import "./Notification.css";
import { useNotification } from "../../../context/NotificationContext";

export default function Notification() {
    const { notification, closeNotification } = useNotification();

    if (!notification.message) return null;

    return (
        <div className={`notification ${notification.type}`}>
            <h2 className="notification-title">
                {notification.type.charAt(0).toUpperCase() +
                    notification.type.substring(1)}
            </h2>
            <span>{notification.message}</span>
            <div className="notification-btn">
                <button className="close-btn" onClick={closeNotification}>
                    Ok
                </button>
            </div>
        </div>
    );
}
