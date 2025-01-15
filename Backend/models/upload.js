// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  s3Key: { type: String, required: true }, // Path in S3 bucket
  fileUrl: { type: String, required: true }, // Full S3 URL
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
