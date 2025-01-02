// import express from 'express'
// import path from 'path';
// import connect from './connection.js'
// // const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const routes = require('./routes'); // Import your routes file

// // Load environment variables from .env file
// dotenv.config();

// // Create an Express app
// const app = express();

// // Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Parse JSON request bodies

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Define API routes
// app.use('/api', routes); // Prefix all routes with /api

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'An error occurred on the server.' });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import path from "path";
import connect from "./connection.js";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

if (!process.env.DB_URI || !process.env.JWT_SECRET || !process.env.VITE_PORT) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./dist"));


  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
;

// Start the server
const port = process.env.VITE_PORT || 4000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      console.log("Database connected successfully");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
  });


