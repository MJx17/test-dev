const express = require('express');
const multer = require('multer');
const { uploadFileToR2 } = require('../utils/cloudflare'); // Path to your Cloudflare R2 utility
const CloudflareFile = require('../models/cloudFlare'); // Import the CloudflareFile model
const router = express.Router();

// Set up multer storage and file handling
const storage = multer.memoryStorage(); // Store file in memory for easier handling
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }); // Limit file size to 50MB

// POST route to handle single file upload to Cloudflare R2
router.post('/upload-cf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const bucketName = process.env.R2_BUCKET_NAME; // Get the R2 bucket name from environment variables
    const r2Key = `uploads/${Date.now()}-${file.originalname}`; // Define the file's path in R2, including timestamp to avoid collisions

    if (!bucketName) {
      return res.status(500).json({ error: 'R2 bucket name not defined in environment variables' });
    }

    // Upload the file to Cloudflare R2
    const result = await uploadFileToR2(file.buffer, bucketName, r2Key);

    // Construct the public URL for the uploaded file using the r2dev URL
    const r2devUrl = `${process.env.R2_DEV_URL}/${r2Key}`;

    // Log the URL to the console (optional)
    console.log(`File uploaded: ${r2devUrl}`);

    // Save only the URL to the database
    const newFile = new CloudflareFile({
      fileUrl: r2devUrl, // Only save the r2dev URL
    });

    // Save the file document in the database
    await newFile.save();

    // Send response with the result and URL of the uploaded file
    res.status(200).json({
      message: 'File uploaded successfully!',
      file: {
        fileUrl: r2devUrl,  // Return the r2dev URL in the response
      }
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Failed to upload the file to Cloudflare R2' });
  }
});




module.exports = router;
