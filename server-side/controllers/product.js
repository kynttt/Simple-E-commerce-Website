// Dependencies and Modules
const Product = require("../models/Product");
const User = require("../models/User");

// Create New Product Controller
module.exports.addProduct = (req, res) => {

	// Create a new product object to be saved as document in the "product" collection
	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	// Saves the created object to our database
	return newProduct.save().then((product, error) => {

		// returns false of there is an error saving the document
		if(error){

			return res.send(false);

		// Return true if there is no error
		} else {

			return res.send(true);
		}
	}).catch(error => res.send(error));

}


// Retrieve All Products
module.exports.getAllProducts = (req, res) => {

	// to retrieve all the documents in the "products" collection, we will use the find({}) method
	return Product.find({}).then(result => {
		return res.send(result);
	});
}



// Retrieve All ACTIVE Products
module.exports.getAllActive = (req, res) => {

	return Product.find({isActive: true}).then(result => {
		return res.send(result);
	});
}


// Retrieve Single Product
module.exports.getProduct = (req, res) => {

	// Retrieve a document using the "findById" method and the id is comming from the url endpoint
	// Example: URL - http://localhost:4000/products/6523b1f79aa608c103ff3866
	// The product Id is "6523b1f79aa608c103ff3866" will passed in the "productId" wildcard which can be accessed using the req.params
	return Product.findById(req.params.productId).then(result => {
		return res.send(result);
	});
}



// Update a Product
module.exports.updateProduct = (req, res) => {

	// Specify the fields/properties of the document to be updated
	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	// Syntax
		// findByIdAndUpdate(documentId, updatesToBeApplied)
	return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {

		// If product was not updated
		if(error){
			return res.send(false);

		// If product was updated successfully
		} else {
			return res.send(true);
		}
	});
}




// Archive a Product
module.exports.archiveProduct = (req, res) => {

	let updatedActiveField = {
		isActive: false
	}

	return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {

		if(error){
			return res.send(false);
		} else {
			return res.send(true);
		}
	});
}



// Activate a Product
module.exports.activateProduct = (req, res) => {

	let updatedActiveField = {
		isActive: true
	}

	return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {

		if(error){
			return res.send(false);
		} else {
			return res.send(true);
		}
	});
}



// Get all the checked-out user to a specific product
module.exports.getEmailsOfPurchasedUsers = async (req, res) => {
	const productId = req.params.productId; // Use req.params instead of req.body
  
	try {
	  // Find the product by productId
	  const product = await Product.findById(productId);
  
	  if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	  }
  
	  // Get the userIds of users who purchased the product
	  const userIds = product.userOrders.map(purchase => purchase.userId);
  
	  // Find the users with matching userIds
	  const purchasedUsers = await User.find({ _id: { $in: userIds } });
  
	  // Extract the emails from the purchased users
	  const emails = purchasedUsers.map(user => user.email);
  
	  res.status(200).json({ userEmails: emails });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'An error occurred while retrieving purchased users' });
	}
  };


  
// Controller action to search for products by product name
module.exports.searchProductsByName = async (req, res) => {
	try {
	  const { productName } = req.body;
  
	  // Use a regular expression to perform a case-insensitive search
	  const products = await Product.find({
		name: { $regex: productName, $options: 'i' }
	  });
  
	  res.json(products);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };