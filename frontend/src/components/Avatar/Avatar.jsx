import "./Avatar.css";
export default function Avatar({
    username,
    size = "40px",
    onClick,
    clickable = false,
}) {
    const getInitials = (name) => {
        if (!name || typeof name !== "string") return "";

        const words = name
            .trim()
            .split(" ")
            .filter((word) => word.length > 0);
        const firstLetter = words[0]?.charAt(0) || "";
        const secondLetter = words[1]?.charAt(0) || "";

        return (firstLetter + secondLetter).toUpperCase();
    };

    return (
        <div
            className={`avatar ${clickable ? "avatar--clickable" : ""}`}
            style={{
                width: size,
                height: size,
                fontSize: `calc(${size} * 0.4)`,
            }}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={clickable ? onClick : undefined}
        >
            {getInitials(username)}
        </div>
    );
}
