// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Import the bcrypt library for hasing user passwords securely
const bcrypt = require('bcrypt');

// Define the Schema class from mongoose, which is used to define the structure of a MongoDB document
const Schema = mongoose.Schema;

// Create a new schema for the "User" model, which defines how users will be structured in MongoDB
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    sobrietyStartDate: {
        type: Date, // Used to keep track of the user's sobriety start date
    }
});

// Pre-save hook to hash the password before saving it to the database (for security purposes)
userSchema.pre('save', async function (next) {
    // If the password is not modified, skip hashing and move on to the next middleware
    if (!this.isModified('password')) return next();
    // Hash the password using bcrypt with a salt rounds value of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Instance method to compare a given password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    // Compare the provided password with the stored hashed password
    return await bcrypt.compare(password, this.password);
};

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model('User', userSchema);
