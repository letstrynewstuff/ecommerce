import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  trackingCode: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered", "On Hold"],
    default: "Pending",
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
  currentLocation: { type: String, required: true },
  eta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Location", locationSchema);
