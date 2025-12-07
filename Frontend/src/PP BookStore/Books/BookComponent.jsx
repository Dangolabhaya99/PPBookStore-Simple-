import React, { useState } from "react";

const BookComponent = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPublication, setSelectedPublication] = useState("All");
    const [quantities, setQuantities] = useState({});

    const publications = ["All", "ReadMore", "Samjhana", "GoodWill"];

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // const handlePublicationChange = (event) => {
    //     setSelectedPublication(event.target.value);
    // };

    const handleAddToCart = (book) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingBook = cart.find(item => item.Title === book.Title);

        if (existingBook) {
            existingBook.quantity += quantities[book.Title] || 1;
        } else {
            cart.push({ ...book, quantity: quantities[book.Title] || 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.alert(`${book.Title} has been added to your cart`);
    };

    const handleQuantityChange = (title, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [title]: Math.max((prevQuantities[title] || 1) + delta, 1)
        }));
    };

    const filteredBooks = props.data.filter((book) => {
        const matchesSearch = book.Title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPublication = selectedPublication === "All" || book.Publication === selectedPublication;
        return matchesSearch && matchesPublication;
    });

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-100">
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <ul>
                    {publications.map((publication, index) => (
                        <li key={index} className={`cursor-pointer mb-2 p-2 rounded ${selectedPublication === publication ? 'bg-blue-200' : ''}`} onClick={() => setSelectedPublication(publication)}>
                            {publication}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4 overflow-y-auto h-screen">
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex flex-wrap justify-around items-center gap-20">
                    {filteredBooks.map((product, index) => (
                        <div
                            className="w-52 transform transition duration-500 hover:scale-105"
                            key={index}
                        >
                            <div className="h-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    className="px-2"
                                    src={product.imgUrl}
                                    alt={product.Title}
                                />
                                <div className="p-4">
                                    <div className="font-bold text-xl mb-2">{product.Title}</div>
                                    <p className="text-gray-700 text-base">{product.Description}</p>
                                    <div className="font-bold text-sm mb-2">{product.Publication}</div>
                                    <div className="font-bold text-sm mb-2">Rs. {product.Price}</div>
                                    <div className="flex items-center justify-between mt-4">
                                        <button
                                            onClick={() => handleQuantityChange(product.Title, -1)}
                                            className="bg-red-500 text-white px-3 py-1 text-center rounded-lg hover:bg-red-700 transition duration-300"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{quantities[product.Title] || 1}</span>
                                        <button
                                            onClick={() => handleQuantityChange(product.Title, 1)}
                                            className="bg-green-500 text-white px-3 py-1 text-center rounded-md hover:bg-green-700 transition duration-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-500 text-white px-4 py-2 text-center rounded-md hover:bg-green-700 transition duration-300 mt-4"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookComponent;
