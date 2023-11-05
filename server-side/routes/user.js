// Dependecies and Modules
const express = require("express");
const userController = require("../controllers/user");

// Auth
const auth = require("../auth");
// object destructuring
const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();

// Routes


// Route for user Registration
router.post('/register', userController.registerUser)


// Route for User Authentication (Login)
// Here we have streamlined the login route by directly invoking the loginUser function. Consequenty, the req.body request will now be incorporated into the controller function.
router.post("/login", userController.loginUser);


// [Section] Route to User checkout
router.post("/checkout", verify, userController.checkoutUser); 


// Route for retrieving user details
// router.get("/:userId/userDetails", verify, userController.retrieveUserDetails);
router.get("/details", verify, userController.getProfile);




// Retrieve All Orders
router.get('/orders', verify, verifyAdmin, userController.getAllOrders);


// Retrieve All orders of an Authenticated Non-admin User
router.get('/myOrders', verify, userController.getUserOrders);


// Route to let an admin user update another user as an admin
router.put('/:userId/setAsAdmin', verify, verifyAdmin, userController.updateAdmin)


// [Section] Password Reset Route
// POST route for resetting the password
router.post('/reset-password', verify, userController.resetPassword);


// Route to list authenticated users
router.get('/authenticated', verify, verifyAdmin, userController.listAuthenticatedUsers);



// Route to make an admin user a regular user
router.put('/:userId/setAsRegularUser', verify, verifyAdmin, userController.setAsRegularUser);



// Export Route System
module.exports = router;