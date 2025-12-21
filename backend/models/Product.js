// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: {
//     type: String,
//     enum: [
//       "phones",
//       "laptops",
//       "satellite",
//       "radios",
//       "intercom",
//       "headsets",
//       "satellitetv",
//       "networks",
//     ], 
//     required: true,
//   },
//   price: { type: Number, required: true },
//   description: String,
//   specs: [String],
//   image: { type: String, default: "placeholder.jpg" }, // Placeholder image
//   stock: { type: Number, default: 10 },
//   featured: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// // module.exports = mongoose.model("Product", productSchema);

// export default mongoose.model("Product", "find", productSchema);
import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },

  category: {
    type: String,
    enum: [
      "phones",
      "laptops",
      "satellite",
      "radios",
      "intercom",
      "headsets",
      "satellitetv",
      "networks",
    ],
    required: true,
  },

  price: { type: Number, required: true },
  description: String,
  specs: [String],
  image: { type: String, default: "placeholder.jpg" },
  stock: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model("Product", productSchema);
