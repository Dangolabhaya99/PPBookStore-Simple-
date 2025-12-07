const Publication = require("../Models/PublicationModels");

// Controller for adding a Publication
const addPublication = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if Publication already exists
    const publicationExists = await Publication.findOne({ name });
    if (publicationExists) {
      return res.status(400).json({ msg: "Publication already exists" });
    }

    // Create and save new Publication
    const newPublication = new Publication({
      name,
      description,
    });
    await newPublication.save();
    return res.status(201).json({ msg: "Publication added successfully", publication: newPublication });
  } catch (error) {
    console.error("Error adding publication:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Controller for getting all Publications
const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    return res.status(200).json({ msg: "Publications fetched successfully", publications });
  } catch (error) {
    console.error("Error fetching publications:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Controller for getting a single Publication
const getPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    return res.status(200).json({ msg: "Publication fetched successfully", publication });
  } catch (error) {
    console.error("Error fetching publication:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Controller for updating a Publication
const updatePublication = async (req, res) => {
  const { name, description } = req.body;
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ msg: "Publication not found" });
    }

    // Update the publication fields
    publication.name = name || publication.name;
    publication.description = description || publication.description;

    await publication.save();
    return res.status(200).json({ msg: "Publication updated successfully", publication });
  } catch (error) {
    console.error("Error updating publication:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Controller for deleting a Publication
const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ msg: "Publication not found" });
    }
    return res.status(200).json({ msg: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addPublication, getPublications, getPublication, updatePublication, deletePublication };
