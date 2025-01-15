const mongoose = require('mongoose');

// Define the Resource schema
const resourceSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
    unique: true, // Each route should be unique
  },
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // HTTP methods
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role', // Reference to the Role collection
    },
  ],
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission', // Reference to the Permission collection
    },
  ],
  auditLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuditLog', // Reference to the AuditLog model
  }],
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
