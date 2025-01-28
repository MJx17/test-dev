const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
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
  auditLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuditLog', // Reference to the AuditLog model
  }],
});

const NoticeCard = mongoose.model('NoticeCard', NoticeSchema);
module.exports = NoticeCard;
