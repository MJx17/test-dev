const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const mime = require('mime-types'); // Import mime-types to detect content type

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

// Utility function to upload files to S3
const uploadFileToS3 = async (filePath, bucketName, s3Key) => {
  try {
    const fileContent = fs.createReadStream(filePath); // Use stream for better memory management

    // Detect content type based on the file extension
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'; // Default to binary stream if type can't be detected

    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
      ContentType: mimeType, // Dynamically set content type
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    return data; // Return S3 response if needed
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error; // Re-throw the error for further handling
  }
};

module.exports = { uploadFileToS3 };
