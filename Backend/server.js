const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');  // AWS SDK v3
const fs = require('fs');
const path = require('path')


// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect to MongoDB
connectDB();



// Use the resource routes



// Use user routes
const SuperAdmin = require('./routes/superAdmin');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const awsUploadRoute = require('./routes/awsUpload');
const cfUploadRoute = require('./routes/cloudflare');
const cf = require('./routes/Cf');
const rates = require('./routes/rates');
const resourceRoutes = require('./routes/resource');

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', SuperAdmin);
app.use('/', authRoute);
app.use('/', uploadRoute);
app.use('/', awsUploadRoute);
app.use('/', cfUploadRoute);
app.use('/', cf);
app.use('/', rates);
app.use('/', resourceRoutes);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});




// Initialize the S3Client for Cloudflare R2
// const r2 = new S3Client({
//   region: 'auto', // Use "auto" for R2
//   endpoint: '', // Cloudflare R2 endpoint (replace with your R2 endpoint)
//   credentials: {
//     accessKeyId: process.env.R2_ACCESS_KEY, // Access Key ID from environment variables
//     secretAccessKey: process.env.R2_SECRET_KEY, // Secret Access Key from environment variables
//   },
//   signatureVersion: 'v4', // Use AWS Signature v4 for authentication
// });

// module.exports = r2;
