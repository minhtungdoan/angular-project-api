const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Laptop = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laptop", Laptop);
