import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const header = req.header["authorization"];
    const token = header && header.split(" ")[1];

    if(!token) return res.status(403).json({"error": "Access Denied !!"});

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({"Error": "Invalid or Expired Token !!"});
    }
}