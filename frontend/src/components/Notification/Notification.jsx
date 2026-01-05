import "./Notification.css";
import { useNotification } from "../../../context/NotificationContext";

export default function Notification() {
    const { notification, closeNotification } = useNotification();

    if (!notification.message) return null;

    const isDanger = notification.type === "danger";

    return (
        <div className={`notification ${notification.type}`}>
            <h2 className="notification-title">
                {notification.title ||
                    notification.type.charAt(0).toUpperCase() +
                        notification.type.slice(1)}
            </h2>

            <span className="notification-message">{notification.message}</span>

            <div className="notification-btn">
                {notification.onConfirm ? (
                    isDanger ? (
                        <>
                            <button
                                className="cancel-btn"
                                onClick={closeNotification}
                            >
                                {notification.cancelText || "Cancel"}
                            </button>

                            <button
                                className="danger-btn"
                                onClick={() => {
                                    notification.onConfirm();
                                    closeNotification();
                                }}
                            >
                                {notification.confirmText || "Confirm"}
                            </button>
                        </>
                    ) : (
                        <button
                            className="close-btn"
                            onClick={() => {
                                notification.onConfirm();
                                closeNotification();
                            }}
                        >
                            {notification.confirmText || "Ok"}
                        </button>
                    )
                ) : (
                    <button className="close-btn" onClick={closeNotification}>
                        Ok
                    </button>
                )}
            </div>
        </div>
    );
}
