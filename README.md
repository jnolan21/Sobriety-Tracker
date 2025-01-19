# Sobriety Tracker

A web application designed to help users track their sobriety milestones. Built with **JavaScript**, **Express**, and **MongoDB**, this app provides a personalized dashboard with a sobriety timer and user authentication.

## Features

- **User Authentication:** Secure signup and login functionality.
- **Sobriety Timer:** Tracks and displays how long you've been sober in years, months, days, hours, minutes, and seconds.
- **Restart Timer:** Allows users to reset their sobriety start date.
- **Session Management:** Keeps users logged in across sessions until they log out.

## Set Up Guide

- To set up the Sobriety Tracker, start by cloning the repository with git clone https://github.com/your-username/sobriety-tracker.git and navigate into the project directory using cd sobriety-tracker.
- Next, install the required dependencies by running npm install. Set up the necessary environment variables by creating a .env file in the root of the project with the following keys: MONGO_URI (your MongoDB connection string) and SESSION_SECRET (your secret key for session management).
- Once the environment variables are configured, start the server with npm start and visit the application in your browser at http://localhost:5000.

The Sobriety Tracker uses Node.js and Express for the backend, MongoDB as the database, and EJS as the templating engine.
