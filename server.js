const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());

passport.use(new LocalStrategy(User.authenticate()));

//Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

// // Required for session management
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory

app.get("/", (req, res) => {
  res.render("pages/registration");
});

app.use("/", userRouter);
const port = 8000;

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
