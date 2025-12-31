import User from "../models/User.js";

export const getProfileDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("username email");

        if (!user)
            return res.status(404).json({ message: "Profile not found !!" });

        return res.status(200).json({
            message: "Profile details fetched !!",
            details: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
