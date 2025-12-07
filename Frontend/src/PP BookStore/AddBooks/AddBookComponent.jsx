import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBookComponent = () => {
  const [formData, setFormData] = useState({
    book_name: "",
    author: "",
    price: "",
    stock: "",
    description: "",
    publications: "",
    bookImage: "",
  });

  const [publications, setPublications] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      bookImage: file,
    });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("book_name", formData.book_name);
    data.append("author", formData.author);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);
    data.append("publications", formData.publications);
    data.append("bookImage", formData.bookImage);

    console.log("FormData:", {
      book_name: formData.book_name,
      author: formData.author,
      price: formData.price,
      stock: formData.stock,
      description: formData.description,
      publications: formData.publications,
      bookImage: formData.bookImage,
    });

    try {
      const response = await axiosInstance.post("/api/book", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);
      console.log("Book added successfully:", response.data);
    } catch (error) {
      console.error("Error adding book:", error);
      const errorMessage = error.response?.data?.msg || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axiosInstance.get("/api/publication/all");
        console.log("Publications response:", response);
        const fetchedPublications = response.data.publications;
        setPublications(fetchedPublications);

        // Set default publication to the first one if available
        if (fetchedPublications.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            publications: fetchedPublications[0]._id,
          }));
        }
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };
    fetchPublications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg space-y-1"
      >
        <ToastContainer />
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Book Name:
            </label>
            <input
              type="text"
              name="book_name"
              value={formData.book_name}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-gray-800 text-sm font-semibold">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Publications:
            </label>
            <select
              name="publications"
              value={formData.publications}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {publications.length > 0 ? (
                publications.map((pub) => (
                  <option key={pub._id} value={pub._id}>
                    {pub.name}
                  </option>
                ))
              ) : (
                <option value="">No Publications Available</option>
              )}
            </select>
          </div>

          <div className="flex-1 space-y-1">
            <label className="block text-gray-800 text-sm font-semibold">
              Book Image:
            </label>
            <input
              type="file"
              name="bookImage"
              onChange={handleFileChange}
              required
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Book Preview"
              className="rounded-lg shadow-md max-h-80 object-cover mx-auto"
            />
          </div>
        )}

        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookComponent;
