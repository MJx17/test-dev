const ExchangeRate = require('../models/rates');
const { AuditLog } = require('../utils/auditlog');

// Create a new exchange rate
const createExchangeRate = async (req, res) => {
  const { currency, value, selling_rate, countryCode } = req.body;

  // Validate that all required fields are present
  if (!currency || !value || selling_rate === undefined || !countryCode) {
    return res.status(400).json({ message: 'Currency, value, selling_rate, and countryCode are required.' });
  }

  try {
    const newExchangeRate = new ExchangeRate({
      currency,
      value,
      selling_rate,
      countryCode, // Added countryCode
    });

    await newExchangeRate.save();

    // // Log the creation in the audit log
    // await AuditLog('create', 'ExchangeRate', newExchangeRate._id, req.user._id);

    res.status(201).json({ message: 'Exchange rate created successfully.', newExchangeRate });
  } catch (error) {
    console.error('Error creating exchange rate:', error);
    res.status(500).json({ message: 'Error creating exchange rate.' });
  }
};

// Update an exchange rate by ID
const updateExchangeRate = async (req, res) => {
  const { id } = req.params;
  const { currency, value, selling_rate, countryCode } = req.body;

  try {
    // Find the exchange rate by ID and exclude soft-deleted items
    const exchangeRate = await ExchangeRate.findOne({ _id: id, deletedAt: null });

    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found.' });
    }

    const changes = {};
    const previousValues = {};

    // Mapping of fields to check and update
    const fieldsToCheck = {
      currency,
      value,
      selling_rate,
      countryCode,
    };

    // Loop through the fields and check if there's a change
    for (const field in fieldsToCheck) {
      if (fieldsToCheck[field] !== undefined && fieldsToCheck[field] !== exchangeRate[field]) {
        changes[field] = { old: exchangeRate[field], new: fieldsToCheck[field] };
        previousValues[field] = exchangeRate[field];
        exchangeRate[field] = fieldsToCheck[field];
      }
    }

    // If no changes were made, return without saving or logging
    if (Object.keys(changes).length === 0) {
      return res.status(200).json({ message: 'No changes were made to the exchange rate.' });
    }

    // Save updated exchange rate
    await exchangeRate.save();

    // Log the update in the audit log
    // try {
    //   await AuditLog('update', 'ExchangeRate', exchangeRate._id, req.user._id, changes, previousValues);
    // } catch (logError) {
    //   console.error('Error logging audit:', logError);
    // }

    res.status(200).json({ message: 'Exchange rate updated successfully.', exchangeRate });
  } catch (error) {
    console.error('Error updating exchange rate:', error);
    res.status(500).json({ message: 'Error updating exchange rate.' });
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


const getAllExchangeRates = async (req, res) => {
  try {
    // Fetch all exchange rates, including deleted ones
    const exchangeRates = await ExchangeRate.find(); 
    res.status(200).json(exchangeRates);
  } catch (error) {
    console.error('Error fetching all exchange rates:', error);
    res.status(500).json({ message: 'Error fetching exchange rates.' });
  }
};

const getDeletedExchangeRates = async (req, res) => {
  try {
    // Fetch exchange rates where 'deletedAt' is not null
    const exchangeRates = await ExchangeRate.find({ deletedAt: { $ne: null } });
    res.status(200).json(exchangeRates);
  } catch (error) {
    console.error('Error fetching deleted exchange rates:', error);
    res.status(500).json({ message: 'Error fetching deleted exchange rates.' });
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
    

    await exchangeRate.save();

    // // Log the deletion in the audit log
    // await AuditLog('delete', 'ExchangeRate', exchangeRate._id, req.user._id);

    res.status(200).json({ message: 'Exchange rate deleted successfully.', exchangeRate });
  } catch (error) {
    console.error('Error deleting exchange rate:', error);
    res.status(500).json({ message: 'Error deleting exchange rate.' });
  }
};

const hardDeleteExchangeRate = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the exchange rate by its ID
    const exchangeRate = await ExchangeRate.findOne({ _id: id });

    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found.' });
    }

    // Delete the exchange rate permanently
    await ExchangeRate.deleteOne({ _id: id });

    // Log the deletion in the audit log
    // await AuditLog('delete', 'ExchangeRate', id, req.user._id);

    res.status(200).json({ message: 'Exchange rate deleted successfully.' });
  } catch (error) {
    console.error('Error deleting exchange rate:', error);
    res.status(500).json({ message: 'Error deleting exchange rate.' });
  }
};

const restoreExchangeRate = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the exchange rate by its ID and ensure it has been soft deleted
    const exchangeRate = await ExchangeRate.findOne({ _id: id, deletedAt: { $ne: null } });

    if (!exchangeRate) {
      return res.status(404).json({ message: 'Exchange rate not found or not deleted.' });
    }

    // Restore the exchange rate (remove deletedAt and reset deletedBy)
    exchangeRate.deletedAt = null;
    exchangeRate.deletedBy = null;

    await exchangeRate.save();

    // // Log the restoration in the audit log
    // await AuditLog('restore', 'ExchangeRate', id, req.user._id);

    res.status(200).json({ message: 'Exchange rate restored successfully.', exchangeRate });
  } catch (error) {
    console.error('Error restoring exchange rate:', error);
    res.status(500).json({ message: 'Error restoring exchange rate.' });
  }
};



module.exports = {
  hardDeleteExchangeRate,
  createExchangeRate,
  getExchangeRates,
  getAllExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  restoreExchangeRate
};
