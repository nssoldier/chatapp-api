const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED", "LOGING", "LOGOUT", "FORCE"],
      default: "INACTIVE",
    },
    avatar: { type: String },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phoneNumber: { type: String, require: true, unique: true },
    otp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", AccountSchema);
