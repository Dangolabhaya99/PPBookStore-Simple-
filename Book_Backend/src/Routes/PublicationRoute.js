const express = require('express');
const PublicationControllers = require('../Controllers/PublicationControllers');
const auth = require("../Middleware/AuthMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const router = express.Router();

/**
 * @description To create a new publication
 * @api /api/publication/create
 * @access Private (admin)
 * @type POST
 * @return response
 */
router.post("/create", auth, authorizeRole('admin'), PublicationControllers.addPublication);

/**
 * @description To get all publications
 * @api /api/publication/all
 * @access Public
 * @type GET
 * @return response
 */
router.get("/all", PublicationControllers.getPublications);

/**
 * @description To update a publication by id
 * @api /api/publication/update/:id
 * @access Private (admin)
 * @type PATCH
 * @return response
 */
router.patch("/update/:id", auth, authorizeRole("admin"), PublicationControllers.updatePublication);

/**
 * @description To delete a publication by id
 * @api /api/publication/delete/:id
 * @access Private (admin)
 * @type DELETE
 * @return response
 */
router.delete("/delete/:id", auth, authorizeRole("admin"), PublicationControllers.deletePublication);

module.exports = router;
