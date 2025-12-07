const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/CartControllers');

// Add a book to the cart
router.post('/cart/:userId/add', cartController.addToCart);

// Get the user's cart
router.get('/cart/:userId', cartController.getCart);

// Remove a book from the cart
router.patch('/cart/:userId/remove', cartController.removeFromCart);

// Clear the user's cart after checkout
router.delete('/cart/:userId/clear', cartController.clearCart);

module.exports = router;
