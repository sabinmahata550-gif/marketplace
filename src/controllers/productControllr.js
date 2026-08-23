import productService from "../services/productService.js";

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(
            req.body,
            req.user._id
        );

        res.status(201).json({
            message: "Product created successfully.",
            product,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to create product",
        });
    }
};
const getAllProduct = async (req, res) => {
    try {
        const products = await productService.getAllProduct();

        res.status(200).json({
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to get products",
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        console.log(req.params.id)
        const product = await productService.updateProduct(
            req.params.id,
            req.body,
            req.user._id
        );

        res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to update product",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(
            req.params._id,
            req.user.id
        );

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to delete product",
        });
    }
};
export default {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};