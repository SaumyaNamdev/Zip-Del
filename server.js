const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const mongoose=require('mongoose');
const PORT = process.env.PORT || 3000;
const userRoutes=require("./routes/userRoutes");
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/ZipDel')
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log("Mongo Error",err));

// Serve all static files from /public
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Default route to home
app.get("api/auth",userRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view/index.html"));
});


// Handle other static HTML pages (optional for clarity)
app.get("/shop.html", (req, res) => {
  res.sendFile(path.join(__dirname, "view/shop.html"));
});
app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "view/contact.html"));
});
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "view/login.html"));
});
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "view/register.html"));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
