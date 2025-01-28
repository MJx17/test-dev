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
      type: String, // General category for grouping permissions
      required: true,
      trim: true,
    },
    routes: [
      {
        route: {
          type: String,
          required: true, // Route path (e.g., `/users`)
        },
        method: {
          type: String,
          required: true, // HTTP method (e.g., GET, POST)
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        },
      },
    ],
    auditLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuditLog', // Reference to AuditLog model
      },
    ],
    deletedAt: {
      type: Date, // Field for soft deletion
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('Permission', permissionSchema);
