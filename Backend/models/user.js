const mongoose = require('mongoose');
const Role = require('./roles'); // Role model for referencing roles
const AuditLog = require('./auditLog'); // AuditLog model for referencing audit logs

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true, // Ensure a role is assigned
  },
  auditLogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditLog', // Reference to the AuditLog model
    },
  ], // This will store the references to the audit logs associated with the user
});

const User = mongoose.model('User', userSchema);
module.exports = User;
