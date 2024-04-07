const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// GET route to render the registration form
router.get("/register", (req, res) => {
  res.render("pages/registration");
});

// POST route to handle form submission and register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    await User.register(newUser, password);
    const successMessage = "Registration successful!";
    res.render("pages/success", { successMessage });
  } catch (error) {
    console.error(error);
    const errorMessage = "Error registering user. Please try again.";
    res.render("pages/error", { errorMessage });
  }
});


module.exports = router;
