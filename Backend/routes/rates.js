const express = require('express');
const router = express.Router();
const {
  createExchangeRate,
  getExchangeRates,
  updateExchangeRate,
  deleteExchangeRate,
} = require('../controller/ExchangeRate');
const { authenticateJWT } = require('../middleware/checkPermission');
const { authorize } = require('../middleware/auth2');


// Create a new exchange rate (Requires 'superadmin' role)
router.post('/exchange-rates', authenticateJWT(['superadmin']), createExchangeRate);

// Get all exchange rates (Public access)
router.get('/exchange-rates', authorize, getExchangeRates);


// Get a specific exchange rate by currency (Public access)
// router.get('/exchange-rates/:id', getExchangeRateByCurrency);

// Update a specific exchange rate by currency (Requires 'superadmin' role)
router.put('/exchange-rates/:id', authenticateJWT(['superadmin']), updateExchangeRate);

// Delete a specific exchange rate by currency (Requires 'superadmin' role)
router.delete('/exchange-rates/:id', authenticateJWT(['superadmin']), deleteExchangeRate);

module.exports = router;
