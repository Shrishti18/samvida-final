// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const connectDb = require("./config/connectDb");

// // config dot env file
// dotenv.config();

// //databse call
// connectDb();

// //rest object
// const app = express();

// //middlewares
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static('uploads'))

// //routes
// app.use("/api/v1/users", require("./routes/userRoute"));
// app.use("/api/v1/crops", require("./routes/cropRoute"));
// app.use("/api/v1/contracts", require("./routes/contractRoutes"));
// app.use("/api/v1/farmer", require("./routes/farmerRoutes"));
// app.use("/api/v1/company", require("./routes/companyRoutes"));

//port
// const PORT = 8080 || process.env.PORT;

//listen server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// Import necessary modules
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDb from './config/connectDb.js';

// config dot env file
dotenv.config();

// database call
connectDb();

// Create an Express application
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
import userRoute from './routes/userRoute.js';
import cropRoute from './routes/cropRoute.js';
import contractRoutes from './routes/contractRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

app.use('/api/v1/users', userRoute);
app.use('/api/v1/crops', cropRoute);
app.use('/api/v1/contracts', contractRoutes);
app.use('/api/v1/farmer', farmerRoutes);
app.use('/api/v1/company', companyRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
