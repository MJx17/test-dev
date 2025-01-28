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
  selling_rate: {
    type: Number,   // The selling rate of the currency (e.g., USD to EUR selling rate)
    required: true
  },
  countryCode: {
    type: String,   // Country code in ISO 3166-1 alpha-2 format (e.g., 'us', 'gb')
    required: true,  // Ensure the country code is always present
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp for when the document was created
  },
  deletedAt: {
    type: Date,
    default: null, // Automatically set to null unless deleted
  },

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
