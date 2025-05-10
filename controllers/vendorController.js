// Sample vendor controller (modular & scalable)
const vendorController = {

    // Vendor dashboard home
    vendorDashboard: (req, res) => {
      res.render('vendor/dashboard.ejs', {
        title: 'Vendor Dashboard'
         // Optional: to personalize
      });
    },
  
    // Vendor orders page (can be enhanced with DB data)
    vendorOrders: (req, res) => {
      res.render('vendor/orders', {
        title: 'Vendor Orders',
      });
    },
  
    // Vendor products management page
    vendorProducts: (req, res) => {
      res.render('vendor/products', {
        title: 'Manage Products',
      });
    },
  
    // Vendor inventory page
    vendorInventory: (req, res) => {
      res.render('vendor/inventory', {
        title: 'Inventory Overviews',
      });
    }
  
  };
  
  module.exports = vendorController;
  