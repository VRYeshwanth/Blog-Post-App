export default function Avatar({ username, size = "40px" }) {
    const getInitials = (name) => {
        if (!name.trim()) return "?";

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
            className="avatar"
            style={{
                width: size,
                height: size,
                fontSize: `calc(${size} * 0.4)`,
            }}
        >
            {getInitials(username)}
        </div>
    );
}
