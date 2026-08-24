import { z } from "zod";
import { exmail_regex, phone_regex ,password_regex } from "../constants/authRegex.js";

const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .trim(),

    email: z
        .string()
        .regex(exmail_regex, "Invalid email")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .regex(
            password_regex,
            "Password must contain 8 characters, uppercase, lowercase, number and special character"
        ),

    phone: z
        .string()
        .regex(phone_regex, "Invalid Nepal phone number"),
});

const loginSchema = z.object({
    email: z.string().regex(exmail_regex, "Invalid email").optional(),

    phone: z.string().regex(phone_regex, "Invalid phone number").optional(),

    password: z.string().min(1, "Password is required"),
});

export {
    registerSchema,
    loginSchema,
};