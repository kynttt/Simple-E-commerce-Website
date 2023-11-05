// Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

// Auth Middleware
const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();

// ROUTES
// Create a Product Route (POST)
router.post("/", verify, verifyAdmin, productController.addProduct);


// [SECTION] Route for Retrieving All Products (GET)
router.get("/all", productController.getAllProducts);


// [SECTION] Route for retrieving all Active Products (GET)
router.get("/", productController.getAllActive);



// [SECTION] Route for retrieving Single Product (GET)
router.get("/:productId", productController.getProduct);


// [SECTION] Route for Updating a Product (PUT) Admin only
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);


// [SECTION] Route for Archiving a Product (PUT) Admin only
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);


// [SECTION] Route for Activating a Product (PUT) Admin only
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);


// [SECTION] Retrieve all users who purchased a specific product (GET)
router.get('/:productId/purchased-users', productController.getEmailsOfPurchasedUsers);

// [SECTION] Search product by Name (POST)
// Route to search for products by product name
router.post('/search', productController.searchProductsByName);







// Export the router object
module.exports = router;