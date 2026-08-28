import User from "../models/User.js";
import authService from "./authService.js";
import uploadFile from "../utils/fileuploader.js";
import { ADMIN_ROLE, SUPER_ADMIN_ROLE } from "../constants/userRole.js";



// Get all users
const getAllUser = async (query = {}) => {
    const sort = query.sort ? JSON.parse(query.sort) : {};

    const limit = Number(query.limit) || 10;
    const offset = Number(query.offset) || 0;

    const filters = {};

    const { name, email, phone } = query;

    if (name) {
        filters.name = {
            $regex: name,
            $options: "i",
        };
    }

    if (email) {
        filters.email = {
            $regex: email,
            $options: "i",
        };
    }

    if (phone) {
        filters.phone = {
            $regex: phone,
            $options: "i",
        };
    }

    return await User.find(filters)
        .sort(sort)
        .limit(limit)
        .skip(offset);
};


// Get user by ID
const getById = async (id, authUser) => {

    if (
        authUser.id !== id &&
        authUser.role !== ADMIN_ROLE &&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    const user = await User.findById(id);

    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        };
    }

    return user;
};


const createUser = async (data) => {
    return await authService.registerUser(data);
};


const updateUser = async (id, data, authUser) => {

    if (
        authUser.id !== id &&
        authUser.role !== ADMIN_ROLE &&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    const user = await User.findByIdAndUpdate(
        id,
        {
            name: data.name,
            phone: data.phone,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        };
    }

    return user;
};


// Delete user
const deleteUser = async (id, authUser) => {

    if (
        authUser.role !== ADMIN_ROLE &&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        };
    }

    return user;
};


// Update profile image
const updateProfile = async (id, file) => {
    const uploadedFiles = await uploadFile([file]);

    const user = await User.findByIdAndUpdate(
        id,
        {
            profileUrl: uploadedFiles[0],
        },
        {
            new: true,
        }
    );

    return user;
};


// Update user role
const updateUserRole = async (id, role, authUser) => {

    // Only ADMIN or SUPER_ADMIN can change roles
    if (
        authUser.role !== ADMIN_ROLE&&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Only admin can update user role.",
        };
    }

    // Admin cannot create/change someone to SUPER_ADMIN
    if (
        role === SUPER_ADMIN_ROLE&&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Only super admin can assign super admin role.",
        };
    }

    const user = await User.findByIdAndUpdate(
        id,
        {
            role: role,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        };
    }

    return user;
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