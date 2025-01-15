const { S3 } = require('@aws-sdk/client-s3');  // AWS SDK S3 Client
const mime = require('mime-types');  // Library to get MIME type based on file extension

const s3Client = new S3({
  region: 'auto',  // Cloudflare R2 is regionless
  endpoint: process.env.R2_ENDPOINT,  // Cloudflare R2 endpoint
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,  // R2 Access Key
    secretAccessKey: process.env.R2_SECRET_KEY,  // R2 Secret Key
  },
});

async function uploadFileToR2(fileBuffer, bucketName, fileKey) {
  try {
    // Get the MIME type dynamically based on the file's extension
    const contentType = mime.lookup(fileKey) || 'application/octet-stream';

    // Define the S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileKey,  // Unique key for the file, often includes a folder path
      Body: fileBuffer,  // Use the file buffer from Multer
      ContentType: contentType,  // Set the correct MIME type dynamically
      ACL: 'public-read',  // Make the file publicly accessible
    };

    // Upload the file to R2
    await s3Client.putObject(params);

    // Construct the R2 public URL for the uploaded file
    // Use R2_DEV URL for development or a custom R2 public URL
    const fileUrl = `https://${bucketName}.${process.env.R2_DEV_URL}/${fileKey}`;

    // Return the file URL directly
    return { r2Url: fileUrl };
  } catch (err) {
    console.error('Error uploading to Cloudflare R2:', err);
    throw new Error(`Error uploading to Cloudflare R2: ${err.message}`);
  }
}

module.exports = { uploadFileToR2 };
