const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    fullName: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registeredAt: { type: Date },
  },
  { timestamps: true }
);

// User.index(
//   { fullName: "text", email: "text" },
//   { name: "fullName_email_text" }
// );
module.exports = mongoose.model("User", User);
