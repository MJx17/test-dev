const express = require('express');
const router = express.Router();
const {
  createExchangeRate,
  getExchangeRates,
  updateExchangeRate,
  deleteExchangeRate,
  hardDeleteExchangeRate,
  restoreExchangeRate,
  getAllExchangeRates
} = require('../controller/ExchangeRate');
// const { authenticateJWT } = require('../middleware/checkPermission');
// const { authorize } = require('../middleware/auth2');


// Create a new exchange rate (Requires 'superadmin' role)
router.post('/exchange-rates', createExchangeRate);

// Get all exchange rates (Public access)
router.get('/exchange-rates',  getExchangeRates);         


router.get('/exchange-rates/deleted',  getAllExchangeRates);


// Get a specific exchange rate by currency (Public access)
// router.get('/exchange-rates/:id', getExchangeRateByCurrency);

// Update a specific exchange rate by currency (Requires 'superadmin' role)
router.put('/exchange-rates/:id',  updateExchangeRate);


router.put('/exchange-rates/restore/:id',  restoreExchangeRate);


// Delete a specific exchange rate by currency (Requires 'superadmin' role)
router.delete('/exchange-rates/:id',  deleteExchangeRate);
router.delete('/exchange-rates/hard-delete/:id',  hardDeleteExchangeRate);

module.exports = router;
