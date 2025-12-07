const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const authorizeRole = require('../Middleware/authorizationMiddleware');
const { bookImage } = require('../Middleware/uploadMiddleware');
const {
    createBook,
    updateBook,
    searchBooks,
    getBook,

    deleteBook, } = require('../Controllers/BookControllers');
/**
 * @description Create a new product
 * @route POST /api/products
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the created product
 */
router.post('/', authMiddleware, authorizeRole('admin'), bookImage.single('bookImage'), createBook);

/**
 * @description Update an existing product
 * @route PUT /api/products/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated product
 */
router.put('/:id', authMiddleware, authorizeRole('admin'), bookImage.single('bookImage'), updateBook);

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming deletion
 */
router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteBook);

/**
 * @description Get a single product by ID
 * @route GET /api/products/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the product data
 */
router.get('/all', getBook);

/**
 * @description Get all products
 * @route GET /api/products
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing an array of products
 */
router.get('/see', searchBooks);
module.exports = router;