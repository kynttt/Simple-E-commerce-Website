// Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");

// Auth
const auth = require("../auth");








// Controller for User registration
module.exports.registerUser = (req, res) => {

	
	let newUser = new User({
		email: req.body.email,
		password: req.body.password,
		// 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
		password: bcrypt.hashSync(req.body.password, 10)
	});

	// Saves the created object to our database
	return newUser.save().then((user, error) => {

		// User registration fails
		if(error){
			return res.send (false)

		// User registration succeed
		} else {
			return res.send (true)
		}
	});
}



// User Authentication Controller
/*
	Steps: 
		1. Check the database if the user email exists
		2. Compare the password provided in the login form with the password stored in the database.
		3. Generate/return a JSON web token (access token) if the user is successfully logged in and return false if not
*/
module.exports.loginUser = (req, res) => {

	return User.findOne({email: req.body.email}).then(result => {

		// If User does not exist
		if(result == null){

			return res.send(false);

		// If user exists
		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect) {

				res.send({
					access: auth.createAccessToken(result)
				});
			} else {

				return res.send(true);
			}
		}
	});
}






// User Checkout (Non-admin)
/*
	Steps:
		1. Find the document in the db using the user's ID
		2. Add the product ID to the user's orderedProduct array
		3. Update the document in the MongoDB database
*/
module.exports.checkoutUser = async (req, res) => {


	// The admin is not allowed to checkout to a product
	if(req.user.isAdmin){
		return res.send("Action forbidden")
	}

	// Store the value true to the isUserUpdated variable if the order/checkout is successful
	let isUserUpdated = await User.findById(req.user.id).then(user => {

		// Add the productId in an object and push that object into the user's orderedProduct array 
		let newOrder = {
			products: [
				{
				  productId: req.body.productId,
				  productName: req.body.productName,
				  quantity: req.body.quantity
		
			    }
			],
			totalAmount: req.body.totalAmount
			
		}

		user.orderedProduct.push(newOrder);

		// Return true if the saving is successful or return the error message if there are errors
		return user.save().then(user => true).catch(error => error.message);

	});


	// Checks if isUserUpdated is not true
	if(isUserUpdated !== true){

		return res.send({
			message: isUserUpdated
		});
	}

	//  Find the product and update the orderedProduct array of that product with the user id
	let isProductUpdated = await Product.findById(req.body.productId).then(product => {

		let costumer = {
			userId: req.user.id
		}

		product.userOrders.push(costumer);

		return product.save().then(product => true).catch(error => error.message);

	});


	// Check if there was an error saving our product document
	if(isProductUpdated !== true){
		return res.send({
			message: isProductUpdated
		});
	}

	// Checks if isUserUpdated and isProductUpdated is true, then the checkout is successful
	if(isUserUpdated && isProductUpdated){
		return res.send({
			message: "Checked-out Successfully."
		});
	}


}



// Retrieve User Details Controller
// module.exports.retrieveUserDetails = async (req, res) => {
// 	try {
// 	  // Find the user document using the user's ID
// 	  const user = await User.findById(req.params.userId);
  
// 	  if (!user) {
// 		return res.status(404).json({ message: 'User not found' });
// 	  }
  
// 	  // Reassign the password to an empty string (or you can omit it from the response)
// 	  user.password = '';
  
// 	  // Return the user document with the password reassigned to an empty string
// 	  res.status(200).json(user);
// 	} catch (error) {
// 	  res.status(500).json({ message: 'Internal server error' });
// 	}

module.exports.getProfile = (req, res) => {

	return User.findById(req.user.id).then(result => {

		// Changes the value of the user's password to an empty string for security
		result.password = "";

		// Returns the user information with the password as an empty string
		return res.send(result);

		//if there are errors finding the document
	}).catch(error => res.send(error));
}





// To retrieve all orders
module.exports.getAllOrders = (req, res) => {

	return Product.find().then(result => {
		return res.send(result);
	});
}





// Retrieve the orders of an authenticated Non-admin User
module.exports.getUserOrders = (req, res) => {

	// Validates if the User is not an admin
	if(req.user.isAdmin){
		return res.send("Action forbidden")
	}

	return User.findById(req.user.id).then(result => {

		// Changes the value of the user's password to an empty string for security
		result.password = "";

		// Returns the user information with the Orders
		return res.send(result);

		//if there are errors finding the document
	}).catch(error => res.send(error));
}




// Controller function for An Admin to update a user to become Admin
module.exports.updateAdmin = (req, res) => {

	let updatedActiveField = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(req.params.userId, updatedActiveField).then((user, error) => {

		if(error){
			return res.send(false);
		} else {
			return res.send(true);
		}
	});
}

// Function to reset the password
module.exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user; // Extracting user ID from the authorization header

    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Updating the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    // Sending a success response
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to list all authenticated users
module.exports.listAuthenticatedUsers = async (req, res) => {
	try {
	  const authenticatedUsers = await User.find({ }); // Adjust the field based on your authentication system
	  res.status(200).json(authenticatedUsers);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  };


  // Controller method to make an admin user a regular user
module.exports.setAsRegularUser = async (req, res) => {
	const userId = req.params.userId;
  
	try {
	  // Find the user by userId and update their isAdmin field
	  const user = await User.findByIdAndUpdate(userId, { isAdmin: false });
	  res.status(200).json({ message: 'User is now a regular user' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  };