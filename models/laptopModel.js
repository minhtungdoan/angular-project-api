const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Laptop = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laptop", Laptop);
