const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String, // This field is flexible and can accept any string
      required: true, // Ensure every permission has a category
      trim: true,
    },
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
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;
