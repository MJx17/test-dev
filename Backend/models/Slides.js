const mongoose = require('mongoose');

const slideshowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Each image is a URL
    required: true
  }],
  auditLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuditLog', // Reference to the AuditLog model
  }],
 
},
{
  timestamps: true, // This will automatically create `createdAt` and `updatedAt`
}
);

const Slideshow = mongoose.model('Slideshow', slideshowSchema);
module.exports = Slideshow;
