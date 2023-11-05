const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"]
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Description is required"]
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  userOrders: [
    {
      userId: {
        type: String,
		required: [true, "UserId is required"]
      },
      orderId: String, // Optional, can be generated as needed
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
