const ExchangeRate = require('../models/rates');
const { AuditLog } = require('../utils/auditlog');

// Create a new exchange rate
const createExchangeRate = async (req, res) => {
  const { currency, value, exchange_rate } = req.body;

  try {
    const newExchangeRate = new ExchangeRate({
      currency,
      value,
      exchange_rate,
    });

    await newExchangeRate.save();

    // Log the creation in the audit log
    await AuditLog('create', 'ExchangeRate', newExchangeRate._id, req.user._id);

    res.status(201).json({ message: 'Exchange rate created successfully.', newExchangeRate });
  } catch (error) {
    console.error('Error creating exchange rate:', error);
    res.status(500).json({ message: 'Error creating exchange rate.' });
  }
};

// Get all exchange rates
const getExchangeRates = async (req, res) => {
  try {
    const exchangeRates = await ExchangeRate.find({ deletedAt: null }); // Exclude deleted records
    res.status(200).json(exchangeRates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ message: 'Error fetching exchange rates.' });
  }
};

// Get exchange rate by ID
const getExchangeRateById = async (req, res) => {
  const { id } = req.params;

  try {
    const exchangeRate = await ExchangeRate.findOne({ _id: id, deletedAt: null });
    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found.' });
    }
    res.status(200).json(exchangeRate);
  } catch (error) {
    console.error('Error fetching exchange rate by ID:', error);
    res.status(500).json({ message: 'Error fetching exchange rate.' });
  }
};

// Update an exchange rate by ID
const updateExchangeRate = async (req, res) => {
  const { id } = req.params;
  const { currency, value, exchange_rate } = req.body;

  try {
    // Find the exchange rate by ID and exclude soft-deleted items
    const exchangeRate = await ExchangeRate.findOne({ _id: id, deletedAt: null });

    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found.' });
    }

    const changes = {};
    const previousValues = {};

    // Check and update `currency`
    if (currency !== undefined && currency !== exchangeRate.currency) {
      changes.currency = { old: exchangeRate.currency, new: currency };
      previousValues.currency = exchangeRate.currency;
      exchangeRate.currency = currency;
    }

    // Check and update `value`
    if (value !== undefined && value !== exchangeRate.value) {
      changes.value = { old: exchangeRate.value, new: value };
      previousValues.value = exchangeRate.value;
      exchangeRate.value = value;
    }

    // Check and update `exchange_rate`
    if (exchange_rate !== undefined && exchange_rate !== exchangeRate.exchange_rate) {
      changes.exchange_rate = { old: exchangeRate.exchange_rate, new: exchange_rate };
      previousValues.exchange_rate = exchangeRate.exchange_rate;
      exchangeRate.exchange_rate = exchange_rate;
    }

    // If no changes were made, return without saving or logging
    if (Object.keys(changes).length === 0) {
      return res.status(200).json({ message: 'No changes were made to the exchange rate.' });
    }

    // Save updated exchange rate
    await exchangeRate.save();

    // Log the update in the audit log
    await AuditLog('update', 'ExchangeRate', exchangeRate._id, req.user._id, changes, previousValues);

    res.status(200).json({ message: 'Exchange rate updated successfully.', exchangeRate });
  } catch (error) {
    console.error('Error updating exchange rate:', error);
    res.status(500).json({ message: 'Error updating exchange rate.' });
  }
};

// Soft delete an exchange rate by ID
const deleteExchangeRate = async (req, res) => {
  const { id } = req.params;

  try {
    const exchangeRate = await ExchangeRate.findOne({ _id: id, deletedAt: null });

    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found.' });
    }

    // Mark as deleted
    exchangeRate.deletedAt = new Date();
    exchangeRate.deletedBy = req.user._id; // Assuming req.user._id is the logged-in user

    await exchangeRate.save();

    // Log the deletion in the audit log
    await AuditLog('delete', 'ExchangeRate', exchangeRate._id, req.user._id);

    res.status(200).json({ message: 'Exchange rate deleted successfully.', exchangeRate });
  } catch (error) {
    console.error('Error deleting exchange rate:', error);
    res.status(500).json({ message: 'Error deleting exchange rate.' });
  }
};

module.exports = {
  createExchangeRate,
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
};
