// Import the express library to handle routing
const express = require('express');
// Import bcryptjs library for securely comparing passwords
const bcrypt = require('bcryptjs');
// Import the User model for interacting with "User" collection in MongoDB
const User = require('../models/User');

// Create a new express router instance to handle routes
const router = express.Router();

// Signup Route: When a GET request is made to '/signup'
router.get('/signup', (req, res) => {
    // Render the signup view (signup.ejs) for the user to enter their details
    res.render('auth/signup', { locals: { title: "Sign Up" } });
});

// Signup Route: When a POST request is made to '/signup' (when the user submits the signup form)
router.post('/signup', async (req, res) => {
    
    // Destructure username and password from the request body (form data)
    const { username, password } = req.body;
    try {
        // Check if a user with the same username already exists in the database'
        const userAlreadyExists = await User.findOne({ username });
        // Check if a user with that username already exists
        if (userAlreadyExists) {
            return res.render('auth/signup', {
                locals: {
                    title: "Sign Up"
                },
                errorMessage: "Username not available. Choose another username."
            });
        } else {
            // Create a new user document with the provided username and password
            const user = new User({ username, password });
            // Save the new user document to the database
            await user.save();

            // After saving the new user, redirect to the login page
            res.redirect('/login');

        }

    } catch (error) {
        // If there's an error, log it and redirect back to signup page
        console.log(error);
        res.redirect('/signup');
    }

});



// Login Route: When a GET request is made to '/login'
router.get('/login', (req, res) => {
    // Render the signup view (signup.ejs) for the user to enter their details
    res.render('auth/login', { locals: { title: "Log In" } });
});


// Login Route: When a POST request is made to '/login' (when the user submits the login form)
router.post('/login', async (req, res) => {
    // Destructure the username and password from the request body (form data)
    const { username, password } = req.body;
    try {
        // Find the user in the database by their username
        const user = await User.findOne({ username });
        // Check if the user doesn't exist, or the password doesn't match
        if (!user || !(await user.comparePassword(password))) {
            return res.render('auth/login', {
                locals: {
                    title: "Log In"
                },
                errorMessage: "You have entered an invalid username or password."
            });
        }

        // If login is successful, store the user object in the session
        req.session.user = user;
        // If the user is a new user (sobrietyStartDate is undefinded), render the new_user_dashboard
        if (!user.sobrietyStartDate) {
            res.render('dashboard/new_user_dashboard', { user })
        } else {
            res.render('dashboard/dashboard', { user, sobrietyStartDate: user.sobrietyStartDate } );
        }

    } catch (error) {
        // If there's an error, log it and redirect back to login page
        console.log(error);
        res.render('auth/login', {
            locals: {
                title: "Log In"
            },
            errorMessage: "An error occurred. Please try again later."
        });
    }
});



// Define the route for the dashboard page ('/dashboard') - GET request
router.get('/dashboard', async (req, res) => {
    // Check if the user is not logged in (no user session exists)
    if (!req.session.user) {
        // Redirect to login page in user is not logged in
        return res.redirect('/login');
    }

    const user = await User.findById(req.session.user); // Fetch the user from the database

    // Render the 'dashboard' view, passing the locals data (i.e. title username, and sobriety start date)
    res.render('dashboard', { user, sobrietyStartDate: user.sobrietyStartDate });

});


// Start Timer route: Starts the sobriety timer
router.post('/dashboard/start', async (req, res) => {
    
    // Check if the user is logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // Get the user from the database
    const user = await User.findById(req.session.user);

    // Set the sobriety start date to the current date
    user.sobrietyStartDate = new Date();
    await user.save(); // Save the updated user with the new date

    res.render('dashboard/dashboard', { user, sobrietyStartDate: user.sobrietyStartDate }); // Render the dashboard page view

});


// Logout route: Logs the user out and redirects to the login page
router.post('/dashboard/logout', (req, res) => {
    
    // Terminate the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        // After terminating the session, redirect to the login page
        res.render('auth/login');
    })

    res.render('auth/login', { locals }); // Render the login page view

});


// Export the router to make these routes available in the rest of the app
module.exports = router;
