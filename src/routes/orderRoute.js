import express from "express";
import auth from "../middlewares/authMiddleware.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();


// Create Order
router.post(
    "/",
    auth,
    orderController.createOrder
);


// Get My Orders
router.get(
    "/my-orders",
    auth,
    orderController.getMyOrders
);


// Get Order By ID
router.get(
    "/:id",
    auth,
    orderController.getOrderById
);


// Update Order Status
router.patch(
    "/:id/status",
    auth,
    orderController.updateOrderStatus
);


// Cancel Order
router.patch(
    "/:id/cancel",
    auth,
    orderController.cancelOrder
);


export default router;