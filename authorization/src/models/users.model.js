const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Creating userSchema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Creating hashed password with bcrypt npm
userSchema.pre("save", function (next) {
  // If password is not modified then return next
  if (!this.isModified("password")) return next();

  // hashing the password and updating in current document
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

// Creating a method to check password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Creating database model with user name
module.exports = mongoose.model("user", userSchema);
