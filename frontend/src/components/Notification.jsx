import { useNotification } from "../../context/NotificationContext";

export default function Notification() {
    const { notification, closeNotification } = useNotification();

    if (!notification.message) return null;

    return (
        <div className={`notification ${notification.type}`}>
            <span>{notification.message}</span>
            <button onClick={closeNotification}>×</button>
        </div>
    );
}
