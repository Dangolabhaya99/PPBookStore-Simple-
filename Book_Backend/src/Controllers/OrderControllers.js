const Order = require("../Models/OrderModels");

const createOrder = async (req, res) => {
    const { user, books, totalPrice, orderDate, status } = req.body;
    const newOrder = new Order({
        user: user,
        books: books,
        totalPrice: totalPrice,
        orderDate: orderDate || Date.now(), // Use provided orderDate or default to now
        status: status || 'pending' // Use provided status or default to 'pending'
    });
    try {
        const response = await newOrder.save();
        if (response) {
            res.status(201).json({ message: "Order created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('books.book');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('books.book');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const updateOrderById = async (req, res) => {
    const { user, books, totalPrice, orderDate, status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { user, books, totalPrice, orderDate, status },
            { new: true }
        ).populate('user').populate('books.book');
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order updated successfully", updatedOrder });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};
