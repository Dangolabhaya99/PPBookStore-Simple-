const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/PaymentControllers');

router.post('/create', paymentController.createPayment);

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePaymentById);
router.delete('/:id', paymentController.deletePaymentById);

module.exports = router;
