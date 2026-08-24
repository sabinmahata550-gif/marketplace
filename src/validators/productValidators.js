import { z } from "zod";

const createProductSchema = z.object({
    name: z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .trim(),

    brand: z
        .string()
        .min(2, "Brand is required")
        .trim(),

    category: z
        .string()
        .min(2, "Category is required")
        .trim(),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    stock: z
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
});

export { createProductSchema };