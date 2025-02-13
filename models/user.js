const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    select: false,
    minlength: 2, 
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is requred."],
    validate: {
        validator(value) {
            return validator.isURL(value);
        },
        message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "The email field is requred."],
    validate: {
        validator(value) {
            return validator.isURL(value);
        },
        message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is requred."],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
