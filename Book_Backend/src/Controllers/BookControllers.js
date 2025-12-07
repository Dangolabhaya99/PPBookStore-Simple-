const Book = require("../Models/BookModels");
const domain = "http://localhost:4000";

const sendErrorResponse = (res, error) => {
    console.log(error);
    res.status(500).json({ msg: error.message });
};

const createBook = async (req, res) => {
    try {
        const {
            book_name,
            author,
            price,
            stock,
            description,
            publications,
        } = req.body;
        let bookData = {
            book_name,
            author,
            price,
            stock,
            description,
            publications,
        };

        if (req.file) {
            const bookImage = `${domain}/uploads/Products/${req.file.filename}`;
            bookData.bookImage = bookImage;
        }

        const book = new Book(bookData);
        await book.save();

        res.status(201).json({
            msg: "Book created successfully",
            book: book,
            success: true,
        });
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

//Update a product (Admin Only)
const updateBook = async (req, res) => {
    try {
        const {
            book_name,
            author,
            price,
            stock,
            description,
            publications,
        } = req.body;
        let updateData = {
            book_name,
            author,
            price,
            stock,
            description,
            publications,
        };

        if (req.file) {
            const bookImage = `${domain}/uploads/Products/${req.file.filename}`;
            updateData.bookImage = bookImage;
        }

        const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        res.status(200).json({
            msg: "Book updated successfully",
            book: book,
            success: true,
        });
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

// Get all products (Public)
const searchBooks = async (req, res) => {
    const { search, sort } = req.query;
  let query = {
  };
  if (search) {
    query.book_name = { $regex: search, $options: "i" };
  }

  let books = await Book.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    books = books.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.json(books);
};


// Get all books (Public) and filter by category
const getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.categoryId });
        res.status(200).json(books);
      } catch (error) {
        sendErrorResponse(res, error);
      }
    };


// Get a single book by ID (Public)
const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
    
        if (!book) {
          return res.status(404).json({ msg: "Book not found" });
        }
    
        res
          .status(200)
          .json({ msg: "Book found successfully", book: book });
      } catch (error) {
        sendErrorResponse(res, error);
      }
    };


// Delete a book (Admin Only)
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        res
            .status(200)
            .json({ msg: "Book deleted successfully", success: true });
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

module.exports = {
    createBook,
    updateBook,
    searchBooks,
    getBook,
    getBooksByCategory,
    deleteBook,
};