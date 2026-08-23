import jwt from "jsonwebtoken";
import JWT from "../utils/jwt.js";
const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token required",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded =JWT.verifyToken(token)


        req.user = decoded.user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default auth;