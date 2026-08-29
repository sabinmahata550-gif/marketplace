import { ORDER_CANCELLED, ORDER_PENDING } from "../constants/orderStatus.js";
import { ADMIN_ROLE, SUPER_ADMIN_ROLE } from "../constants/userRole.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Create Order
const createOrder = async (data, userId) => {
    const { items, shippingAddress, paymentMethod } = data;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {

        const product = await Product.findById(item.product);

        if (!product) {
            throw {
                status: 404,
                message: `Product ${item.product} not found.`,
            };
        }

        if (product.stock < item.quantity) {
            throw {
                status: 400,
                message: `${product.name} has insufficient stock.`,
            };
        }

        const itemPrice = product.price * item.quantity;

        totalAmount += itemPrice;

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price,
        });
    }

    const order = await Order.create({
        customer: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        status: ORDER_PENDING,
    });

    // Reduce product stock
    for (const item of items) {
        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: -item.quantity,
                },
            }
        );
    }

    return order;
};


// Get My Orders
const getMyOrders = async (userId) => {
    return await Order.find({
        customer: userId,
    })
        .populate("items.product", "name price")
        .sort({ createdAt: -1 });
};


// Get Order By ID
const getOrderById = async (id, userId) => {

    const order = await Order.findById(id)
        .populate("customer", "name email phone")
        .populate("items.product", "name price");

    if (!order) {
        throw {
            status: 404,
            message: "Order not found.",
        };
    }

    if (order.customer._id.toString() !== userId.toString()) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    return order;
};


// Update Order Status
const updateOrderStatus = async (id, status, authUser) => {

    if (
        authUser.role !== ADMIN_ROLE &&
        authUser.role !== SUPER_ADMIN_ROLE
    ) {
        throw {
            status: 403,
            message: "Only admin can update order status.",
        };
    }

    const order = await Order.findByIdAndUpdate(
        id,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!order) {
        throw {
            status: 404,
            message: "Order not found.",
        };
    }

    return order;
};


// Cancel Order
const cancelOrder = async (id, userId) => {

    const order = await Order.findById(id);

    if (!order) {
        throw {
            status: 404,
            message: "Order not found.",
        };
    }

    if (order.customer.toString() !== userId.toString()) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    if (order.status !== ORDER_PENDING) {
        throw {
            status: 400,
            message: "Only pending orders can be cancelled.",
        };
    }

    order.status = ORDER_CANCELLED;

    await order.save();

    // Return stock
    for (const item of order.items) {
        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: item.quantity,
                },
            }
        );
    }

    return order;
};


export default {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
};