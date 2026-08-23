import mongoose from "mongoose";
import { ADMIN_ROLE, CUSTOMER_ROLE, SELLER_ROLE } from "../constants/userRole.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            enum: [CUSTOMER_ROLE, SELLER_ROLE, ADMIN_ROLE],
            default: CUSTOMER_ROLE,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;