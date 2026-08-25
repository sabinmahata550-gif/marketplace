import authService from "../services/authService.js";
import jwt from "../utils/jwt.js";

const registerUser = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log("LOGIN CONTROLLER");
        console.log("BODY:", req.body);
        const user = await authService.loginUser(req.body);
        const token = jwt.generateToken(user);
        res.status(201).json({
            message: "User login successfully",
            user,
            token
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }

}

export default {
    registerUser,
    loginUser
};