import Product from "../models/Product.js";

const createProduct = async (data, userId) => {
    try {
        const product = await Product.create({
            ...data,
            seller: userId,
        });

        return product;
    } catch (error) {
        throw {
            message: error.message,
            status: 500,
        };
    }
};

const getAllProduct = async (query) => {
    try {
        const limit = Number(query.limit) || 10;
        const skip = Number(query.skip) || 0;
        const filters = {}

        const { category, brand, min, max, name } = query;

        if (category)
            filters.category = {
                $regex: category,
                $options: "i",

            }

        if (brand)
            filters.brand = {
                $regex: brand,
                $options: "i",

            }
        if (min || max) {
            filters.price = {};

            if (min) {
                filters.price.$gte = (min)
            }

            if (max) {
                filters.price.$lte = (max);
            }
        }

        if (name) filters.name = {
            $regex: name, $options: "i"
        }
        const products = await Product.find(filters)
            .limit(limit)
            .skip(skip)
            .populate("seller", "name email role");

        return products;
    } catch (error) {
        throw {
            message: "Failed to get products",
            status: 500,
        };
    }
};
const updateProduct = async (productId, data, userId) => {
    try {
        const product = await Product.findById(productId);


        if (!product) {
            throw {
                message: "Product not found",
                status: 404,
            };
        }

        if (product.seller.toString() !== userId.toString()) {
            throw {
                message: "You are not allowed to update this product",
                status: 403,
            };
        }

        Object.assign(product, data);

        await product.save();

        return product;
    } catch (error) {
        throw error;
    }
};
const deleteProduct = async (productId, userId) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw {
                message: "Product not found",
                status: 404,
            };
        }

        if (product.seller.toString() !== userId.toString()) {
            throw {
                message: "You are not allowed to delete this product",
                status: 403,
            };
        }

        await product.deleteOne();

        return product;
    } catch (error) {
        throw error;
    }
};

export default {
    createProduct,
    getAllProduct,
    updateProduct,
    updateProduct,
    deleteProduct
};