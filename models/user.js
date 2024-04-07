const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
});

// Add Passport-Local Mongoose plugin to your schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
