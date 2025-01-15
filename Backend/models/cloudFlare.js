const mongoose = require('mongoose');

const cloudflareFileSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
 
});

// Create a model from the schema
const CloudflareFile = mongoose.model('CloudflareFile', cloudflareFileSchema);

module.exports = CloudflareFile;
