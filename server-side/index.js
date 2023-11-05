// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
// CORS (Cross Origin Resource Sharing) 
// Allow out backend application to be available to our frontend application
const cors = require("cors");

// Import Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");


// Server Setup
const app = express();
const port = 4002;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Allows all resources to access our backend application
app.use(cors());

// Database Connection

// Connecting to MongoDB Atlas (Cloud)
mongoose.connect("PASTE THE URI OF YOUR DB HERE", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Connecting to MongoDB Locally
// mongoose.connect("mongodb://localhost:27017/b320-todo", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });


let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database!"));

// Backend Routes
// To access checkEmail route => localhost:4000/users/checkEmail
app.use("/users", userRoutes);
app.use("/products", productRoutes);


// Server start
if(require.main === module){
	app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = app;