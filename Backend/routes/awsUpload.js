const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFileToS3 } = require('../utils/s3util'); // Import the utility function
const File = require('../models/upload'); // Import the File model

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path; // Local file path
    const bucketName = process.env.AWS_BUCKET_NAME; // S3 bucket name from .env
    const s3Key = `uploads/${req.file.filename}`; // Path in S3
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${s3Key}`;

    // Upload file to S3
    await uploadFileToS3(filePath, bucketName, s3Key);

    // Remove the temporary file from the server
    fs.unlinkSync(filePath);

    // Save metadata to the database
    const fileData = new File({
      fileName: req.file.originalname,
      s3Key,
      fileUrl,
    });

    await fileData.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl,
      fileData,
    });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Error uploading file to S3 or saving metadata' });
  }
});

module.exports = router;
