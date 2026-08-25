import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (user) => {

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        config.jwt_secret,
        {
            expiresIn: "1d",
        }
    );

    return token;
};
const verifyToken = (token) => {
    
    
    return jwt.verify(token, config.jwt_secret);
};

export default {
    generateToken,
    verifyToken,
};