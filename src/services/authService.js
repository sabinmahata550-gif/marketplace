import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (data) => {
    try {
        const { name, email, password, phone, role } = data;

        const user = await User.findOne({ email });

        if (user) {
            throw {
                message: "User already exists.",
                status: 400,
            };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            phone,
            role,
        });
        newUser.password = undefined;

        return newUser;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (data) => {
    const { email, password, phone } = data;

    const user = await User.findOne({
        $or: [
            { email: email },
            { phone: phone }
        ]
    });

    if (!user) {
        throw {
            message: "User does not exist.",
            status: 400,
        };
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        throw {
            message: "Invalid email or password.",
            status: 400,
        };
    }

    user.password = undefined;

    return user;
};

export default {
    registerUser,
    loginUser,
};