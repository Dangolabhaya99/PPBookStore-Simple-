const Cart = require('../Models/CartModels');

// Add a book to the user's cart
exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId, quantity } = req.body;

        console.log("Adding to cart - UserID:", userId, "BookID:", bookId, "Quantity:", quantity);

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const bookIndex = cart.books.findIndex(b => b.book.toString() === bookId);
            console.log("Book found in cart at index:", bookIndex);

            if (bookIndex > -1) {
                cart.books[bookIndex].quantity += quantity;
                console.log("Updated quantity:", cart.books[bookIndex].quantity);
            } else {
                cart.books.push({ book: bookId, quantity });
                console.log("Added new book to cart:", bookId);
            }
        } else {
            cart = new Cart({
                user: userId,
                books: [{ book: bookId, quantity }]
            });
            console.log("Created new cart for user:", userId);
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ error: 'Failed to add book to cart' });
    }
};


// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId }).populate('books.book');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Remove a book from the user's cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Filter out the book to be removed
        cart.books = cart.books.filter(b => b.book.toString() !== bookId);

        await cart.save();
        res.status(200).json({ message: 'Book removed from cart', cart });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove book from cart' });
    }
};

// Clear the user's cart after checkout
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOneAndDelete({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};
