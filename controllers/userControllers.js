const User = require("../models/user");
const bcrypt = require('bcryptjs');
//const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
  try {
    console.log("🔁 Incoming registration data:", req.body); // log incoming data

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed password:", hashedPassword);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    console.log("✅ New user created:", newUser); // log created user
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("❌ Registration failed:", err); // log the error
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


// Login a user
const loginUser = async (req, res) => {
  try {
    console.log("🔐 Login route hit");
  console.log("Request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
