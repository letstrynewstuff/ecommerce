// backend/models/Order.js (Updated)
import { Schema, model } from "mongoose";

const locationUpdateSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
  note: String, // Optional note from admin
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Completed", "Cancelled"],
    default: "Pending",
  },
  shippingAddress: String,
  currentLocation: {
    latitude: Number,
    longitude: Number,
  },
  locationHistory: [locationUpdateSchema], // Optional: Array of location updates
  createdAt: { type: Date, default: Date.now },
});

export default model("Order", orderSchema);
