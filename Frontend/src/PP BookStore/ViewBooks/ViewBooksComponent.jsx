import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBooksComponent = () => {
    const [books, setBooks] = useState([]);
    const [publications, setPublications] = useState([]);
    const [selectedPublication, setSelectedPublication] = useState("All");
    const [quantities, setQuantities] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const userId = localStorage.getItem('userId'); // Fetching userId from localStorage

    useEffect(() => {
        fetchBooks();
        fetchPublications();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axiosInstance.get("/api/book/see");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error("Failed to fetch books.");
        }
    };

    const fetchPublications = async () => {
        try {
            const response = await axiosInstance.get("/api/publication/all");
            setPublications(response.data.publications || []);
        } catch (error) {
            console.error("Error fetching publications:", error);
            toast.error("Failed to fetch publications.");
        }
    };

    const handleAddToCart = async (book) => {
        if (!userId) {
            toast.error("You must be logged in to add items to the cart.");
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/cart/${userId}/add`, {
                bookId: book._id,
                quantity: quantities[book._id] || 1,
            });
            toast.success(`${book.book_name} has been added to your cart`);
            console.log("Cart response:", response.data);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add book to cart.");
        }
    };

    const handleQuantityChange = (id, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max((prevQuantities[id] || 1) + delta, 1)
        }));
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.book_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPublication = selectedPublication === "All" || book.publication === selectedPublication;
        return matchesSearch && matchesPublication;
    });

    return (
        <div className="flex">
            <ToastContainer />
            <div className="w-1/4 p-4 bg-gray-100">
                <h2 className="text-lg font-bold mb-4">Publications</h2>
                <ul>
                    <li
                        className={`cursor-pointer mb-2 p-2 rounded ${selectedPublication === "All" ? 'bg-blue-200' : ''}`}
                        onClick={() => setSelectedPublication("All")}
                    >
                        All
                    </li>
                    {publications.map((pub) => (
                        <li
                            key={pub._id}
                            className={`cursor-pointer mb-2 p-2 rounded ${selectedPublication === pub.name ? 'bg-blue-200' : ''}`}
                            onClick={() => setSelectedPublication(pub.name)}
                        >
                            {pub.name}
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
                    {filteredBooks.map((book, index) => (
                        <div
                            className="w-52 transform transition duration-500 hover:scale-105"
                            key={index}
                        >
                            <div className="h-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    className="px-2"
                                    src={book.bookImage || "default-image-url"}
                                    alt={book.book_name}
                                />
                                <div className="p-4">
                                    <div className="font-bold text-xl mb-2">{book.book_name}</div>
                                    <p className="text-gray-700 text-base">{book.description}</p>
                                    <div className="font-bold text-sm mb-2">{book.publication?.name || 'Unknown'}</div>
                                    <div className="font-bold text-sm mb-2">Rs. {book.price}</div>
                                    <div className="flex items-center justify-between mt-4">
                                        <button
                                            onClick={() => handleQuantityChange(book._id, -1)}
                                            className="bg-red-500 text-white px-3 py-1 text-center rounded-lg hover:bg-red-700 transition duration-300"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{quantities[book._id] || 1}</span>
                                        <button
                                            onClick={() => handleQuantityChange(book._id, 1)}
                                            className="bg-green-500 text-white px-3 py-1 text-center rounded-md hover:bg-green-700 transition duration-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(book)}
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

export default ViewBooksComponent;
