const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (name, email, password) {
  //validates
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const controlUser = await this.findOne({ email });
  if (controlUser) {
    throw new Error("User already exists");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
