const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Middleware to check vendor authentication (you can enhance this)
function checkVendorAuth(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'vendor') {
        return next();
    }
    res.redirect('/login'); // redirect to login if not authenticated
}

// Vendor Dashboard Home
router.get('/dashboard', vendorController.dashboard);

// Manage Products
router.get('/products', checkVendorAuth, vendorController.getProducts);

// Add Product
router.get('/products/add', checkVendorAuth, vendorController.addProductForm);
router.post('/products/add', checkVendorAuth, vendorController.addProduct);

// Edit Product
router.get('/products/edit/:id', checkVendorAuth, vendorController.editProductForm);
router.post('/products/edit/:id', checkVendorAuth, vendorController.updateProduct);

// Delete Product
router.post('/products/delete/:id', checkVendorAuth, vendorController.deleteProduct);

// views Orders
router.get('/orders', checkVendorAuth, vendorController.getOrders);

// Update Order Status
router.post('/orders/update/:id', checkVendorAuth, vendorController.updateOrderStatus);

// Profile
router.get('/profile', checkVendorAuth, vendorController.getProfile);
router.post('/profile', checkVendorAuth, vendorController.updateProfile);

module.exports = router;
