const Payment = require("../Models/PaymentModels");

const createPayment = async (req, res) => {
    const { order, user, amount, method, status, transactionId } = req.body;
    const newPayment = new Payment({
        order: order,
        user: user,
        amount: amount,
        method: method,
        status: status || 'pending', // Use provided status or default to 'pending'
        transactionId: transactionId
    });
    try {
        const response = await newPayment.save();
        if (response) {
            res.status(201).json({ message: "Payment created successfully", response });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('order').populate('user');
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('order').populate('user');
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const updatePaymentById = async (req, res) => {
    const { order, user, amount, method, status, transactionId } = req.body;
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            { order, user, amount, method, status, transactionId },
            { new: true }
        ).populate('order').populate('user');
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment updated successfully", updatedPayment });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

const deletePaymentById = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
