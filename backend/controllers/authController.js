import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email already registered" });

        const newUser = User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully !!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser)
            return res.status(400).json({ error: "User not registered !!" });

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch)
            return res.status(400).json({ error: "Invalid Credentials !!" });

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            token: token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
