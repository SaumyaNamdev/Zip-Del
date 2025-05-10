const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const mongoose=require('mongoose');
const PORT = process.env.PORT || 3000;
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes=require("./routes/userRoutes");
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect("mongodb://localhost:27017/ZipDel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Serve all static files from /public
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Default route to home
app.use("/api/auth",userRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.set('view engine', 'ejs');


app.use('/vendor', vendorRoutes);

// Handle other static HTML pages (optional for clarity)
app.get("/shop.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/shop.html"));
});
app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/contact.html"));
});
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});
app.get("/cart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/cart.html"));
});
app.get("/admin-dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/admin-dashboard.html"));
});


// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
