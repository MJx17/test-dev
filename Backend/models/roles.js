const mongoose = require('mongoose');

// Define the Role schema
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to Permission model
      },
    ],
    auditLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuditLog', // Reference to the AuditLog model
      },
    ],
    deletedAt: {
      type: Date, // Field for soft deletion
      default: null,
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt`
  }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
