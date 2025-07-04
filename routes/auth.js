const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const express = require("express");

const router = express.Router();

//this api is for user creation
router.post("/register", async (req, res) => {
  console.log(req.body, "reqqqqqqqqqqqqqq");
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();

  res.json({ message: "User registered " });
});

//this is login api
router.get("/login", async (req, res) => {
  console.log(req.body, "reqqqqqqqqqqqqqq");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
