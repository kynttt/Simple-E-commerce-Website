const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"]
    
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orderedProduct: [
    {
      products: [
        {
          productId: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "Product Id is required"]
            },
          productName: {
            type:String,
            // required: [true, "Product Name is required"]
            },
          quantity: {
            type: Number,
            // required: [true, "Quantity is required"]
            },

      }
    ],
        
      totalAmount: {
        type: Number,
       
        
       
      },
      purchasedOn: {
        type: Date,
        default: Date.now,
      },
    
}
] 

})

module.exports = mongoose.model('User', userSchema);
