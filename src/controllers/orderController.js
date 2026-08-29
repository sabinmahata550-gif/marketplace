import orderService from "../services/orderService.js";


// Create Order
const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(
            req.body,
            req.user.id
        );

        res.status(201).json({
            message: "Order created successfully.",
            order,
        });

    } catch (error) {
        console.log("CREATE ORDER ERROR:", error);

        res.status(error.status || 500).json({
            message: error.message || "Failed to create order.",
        });
    }
};


// Get My Orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await orderService.getMyOrders(
            req.user.id
        );

        res.status(200).json({
            message: "Orders fetched successfully.",
            orders,
        });

    } catch (error) {
        console.log("GET MY ORDERS ERROR:", error);

        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch orders.",
        });
    }
};


// Get Order By ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            message: "Order fetched successfully.",
            order,
        });

    } catch (error) {
        console.log("GET ORDER ERROR:", error);

        res.status(error.status || 500).json({
            message: error.message || "Failed to get order.",
        });
    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(
            req.params.id,
            req.body.status,
            req.user
        );

        res.status(200).json({
            message: "Order status updated successfully.",
            order,
        });

    } catch (error) {
        console.log("UPDATE ORDER STATUS ERROR:", error);

        res.status(error.status || 500).json({
            message: error.message || "Failed to update order status.",
        });
    }
};


// Cancel Order
const cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            message: "Order cancelled successfully.",
            order,
        });

    } catch (error) {
        console.log("CANCEL ORDER ERROR:", error);

        res.status(error.status || 500).json({
            message: error.message || "Failed to cancel order.",
        });
    }
};


export default {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
};