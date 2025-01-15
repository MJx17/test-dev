const mongoose = require('mongoose');

// Define the schema for the exchange rate
const exchangeRateSchema = new mongoose.Schema({
  currency: {
    type: String,   // Currency symbol or name (e.g., USD, EUR, GBP)
    required: true,
    unique: true    // Ensures each currency has a unique record
  },
  value: {
    type: Number,   // The value of the currency (e.g., 1 USD = 0.85 EUR)
    required: true
  },
  exchange_rate: {
    type: Number,   // The exchange rate to a base currency (e.g., USD to EUR rate)
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp for when the document was created
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
    editedBy: mongoose.Schema.Types.ObjectId, // User who made the edit
    changes: String,  // A string describing the changes made
  }],
  auditLogs: [{
    type: mongoose.Schema.Types.ObjectId, // Reference to the AuditLog model
    ref: 'AuditLog',
  }],
  updatedAt: {
    type: Date,
    default: Date.now // Timestamp for when the document was last updated
  }
});

// Create a model based on the schema
const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

module.exports = ExchangeRate;
