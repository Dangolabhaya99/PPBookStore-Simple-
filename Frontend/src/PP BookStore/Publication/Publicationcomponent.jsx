import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublicationComponent = () => {
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({
    name: "",
    description: "",
  });
  const [editingPublication, setEditingPublication] = useState(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosInstance.get("/api/publication/all");
      setPublications(response.data.publications || []);
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Failed to fetch publications.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPublication({ ...newPublication, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPublication) {
        const response = await axiosInstance.patch(
          `/api/publication/update/${editingPublication._id}`,
          newPublication
        );
        toast.success(response.data.msg);
        setEditingPublication(null);
      } else {
        const response = await axiosInstance.post(
          "/api/publication/create",
          newPublication
        );
        toast.success(response.data.msg);
      }
      setNewPublication({ name: "", description: "" });
      fetchPublications();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.msg || "Something went wrong.");
    }
  };

  const handleEdit = (publication) => {
    setNewPublication({
      name: publication.name,
      description: publication.description,
    });
    setEditingPublication(publication);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/publication/delete/${id}`
      );
      toast.success(response.data.msg);
      fetchPublications();
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error(error.response?.data?.msg || "Failed to delete publication.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Publications</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">
            Publication Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newPublication.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-1 text-gray-700 font-semibold">
            Publication Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newPublication.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200 ease-in-out">
          {editingPublication ? "Update Publication" : "Add Publication"}
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Publication List</h2>
        {publications.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((publication) => (
              <li
                key={publication._id}
                className="bg-white shadow-lg rounded p-6 hover:shadow-xl transition-shadow duration-200 ease-in-out"
              >
                <div>
                  <h3 className="font-medium text-xl mb-2">{publication.name}</h3>
                  <p className="text-gray-700">{publication.description}</p>
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => handleEdit(publication)}
                    className="text-blue-500 text-2xl hover:text-blue-700 transition-colors duration-200"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(publication._id)}
                    className="text-red-500 text-2xl hover:text-red-700 transition-colors duration-200"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700">No publications available</p>
        )}
      </div>
    </div>
  );
};

export default PublicationComponent;
