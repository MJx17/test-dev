const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Each image is a URL
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null, // Automatically set to null unless deleted
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who deleted it
    ref: 'User', // Assuming you have a User model
  },
  editHistory: [{
    editedAt: Date,
    editedBy: mongoose.Schema.Types.ObjectId,
    changes: String,
  }],
  auditLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuditLog', // Reference to the AuditLog model
  }],
});

const Carousel = mongoose.model('Carousel', CarouselSchema);
module.exports = Carousel;
