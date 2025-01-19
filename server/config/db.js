// Importing mongoose, a Mongodb object modeling library for Node.js
const mongoose = require('mongoose');

// Defining the connectDB function that connects to the MongoDB database
const connectDB = async () => {
  
  try {
    // Disable mongoose's strict query mode
    mongoose.set('strictQuery', false);

    // Establishing a connection to MongoDB using the URI stored in the environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // If the connection is successful, log the host of the MongoDB instance to the console
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error during the connection, catch it an log the error to the console
    console.log(error);
  }

}

// Exporting the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
