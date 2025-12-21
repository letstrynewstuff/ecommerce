import { Schema, model } from "mongoose";
import { hash } from "bcryptjs";

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 12);
  next();
});

export default model("Admin", adminSchema);
