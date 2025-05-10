const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
//const { checkVendorAuth } = require('../middleware/jwtAuth');

// Dashboard
router.get('/dashboard', vendorController.vendorDashboard);

// Orders
router.get('/orders', (req, res) => {
  res.render('vendor/orders', { title: 'Vendor Orders' });
});

// Products
router.get('/products', (req, res) => {
  res.render('vendor/products', { title: 'Manage Products' });
});

// Inventory
router.get('/inventory', (req, res) => {
  res.render('vendor/inventory', { title: 'Inventory' });
});

module.exports = router;
