import authService from "../services/authService.js";

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
    console.log(req.body)
    try {
        const user = await authService.loginUser(req.body);

        res.status(201).json({
            message: "User login successfully",
            user
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