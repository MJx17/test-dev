const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    action: {
      type: String, // create, update, delete
      required: true
    },
    target: {
      type: String, // For example: Slideshow
      required: true
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the target document
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // User performing the action
      ref: 'User', // Assuming you have a User model
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    changes: { 
      type: String,  // Detailed changes for update actions
      required: false // Not required for create or delete actions
    },
    previousValues: {
      type: String, // Previous values before the update (stored as JSON string)
      required: false
  },
  });
  
const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;
