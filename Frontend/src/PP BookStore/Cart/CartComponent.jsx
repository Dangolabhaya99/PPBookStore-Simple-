import React, { useEffect, useState } from 'react';

const AddToCartPage = () => {
    const [cart, setCart] = useState([]);
    const [deliveryCharge] = useState(50); // Assuming a fixed delivery charge

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
    }, []);

    const handleDelete = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.alert('Book has been removed from your cart');
    };

    const handleQuantityChange = (index, change) => {
        const updatedCart = cart.map((product, i) =>
            i === index ? { ...product, quantity: product.quantity + change } : product
        ).filter(product => product.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalCost = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleCheckout = () => {
        // Handle checkout logic here (e.g., redirect to a payment page, clear the cart, etc.)
        window.alert('Checkout Successfully...');
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl text-center font-bold mb-4">Your Cart</h1>
            <div className="flex flex-wrap items-start m-6">
                <div className="w-full lg:w-2/3 flex flex-wrap items-center">
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((product, index) => (
                            <div
                                className="w-52 transform transition duration-500 hover:scale-105 m-2"
                                key={index}
                            >
                                <div className="h-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        className="px-2"
                                        src={product.bookImage || "default-image-url"}
                                        alt={product.book_name}
                                    />
                                    <div className="p-4">
                                        <div className="font-bold text-xl mb-2">{product.book_name}</div>
                                        <div className="font-bold text-sm mb-1">Rs. {product.price}</div>
                                        <div className="font-bold text-sm mb-2">Quantity: {product.quantity}</div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleQuantityChange(index, -1)}
                                                className="bg-gray-300 text-black px-2 py-1 text-center rounded-md hover:bg-gray-400 transition duration-300"
                                            >
                                                -
                                            </button>
                                            <span className="px-4">{product.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(index, 1)}
                                                className="bg-gray-300 text-black px-2 py-1 text-center rounded-md hover:bg-gray-400 transition duration-300"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="bg-red-500 text-white px-4 py-2 text-center rounded-md hover:bg-red-700 transition duration-300 ml-4"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:pl-8">
                    {cart.length > 0 && (
                        <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="text-lg mb-2">
                                <span className="font-bold">Total Cost:</span> Rs. {getTotalCost()}
                            </div>
                            <div className="text-lg mb-2">
                                <span className="font-bold">Delivery Charge:</span> Rs. {deliveryCharge}
                            </div>
                            <div className="text-lg font-bold mb-4">
                                <span className="font-bold">Grand Total:</span> Rs. {getTotalCost() + deliveryCharge}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment-method">
                                    Payment Method
                                </label>
                                <select
                                    id="payment-method"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="credit-card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash-on-delivery">Cash on Delivery</option>
                                </select>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToCartPage;
