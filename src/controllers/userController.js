import userService from "../services/userService.js";


// Get all users
const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser(req.query);

        res.status(200).json({
            message: "Users fetched successfully.",
            users,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch users.",
        });
    }
};


// Get user by ID
const getById = async (req, res) => {
    try {
        const user = await userService.getById(
            req.params.id,
            req.user
        );

        res.status(200).json({
            message: "User fetched successfully.",
            user,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to get user.",
        });
    }
};


// Create user
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            message: "User created successfully.",
            user,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to create user.",
        });
    }
};


// Update user
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json({
            message: "User updated successfully.",
            user,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to update user.",
        });
    }
};


// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(
            req.params.id,
            req.user
        );

        res.status(200).json({
            message: "User deleted successfully.",
            user,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to delete user.",
        });
    }
};


// Update profile image
const updateProfile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Profile image is required.",
            });
        }

        const user = await userService.updateProfile(
            req.user.id,
            req.file
        );

        res.status(200).json({
            message: "Profile image updated successfully.",
            user,
        });

    } catch (error) {

        res.status(error.status || 500).json({
            message: error.message || "Failed to update profile",
        });
    }
};


// Update user role
const updateUserRole = async (req, res) => {
    try {
        const user = await userService.updateUserRole(
            req.params.id,
            req.body.role,
            req.user
        );

        res.status(200).json({
            message: "User role updated successfully.",
            user,
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to update user role.",
        });
    }
};


export default {
    getAllUser,
    getById,
    createUser,
    updateUser,
    deleteUser,
    updateProfile,
    updateUserRole,
};