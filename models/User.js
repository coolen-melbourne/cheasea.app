import { Schema, model } from "mongoose";

const registerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  number: { type: String, required: true }, // Telefon raqami uchun string
  password: { type: String, required: true }, // Password ham string
  confirmPassword: { type: String, required: true },
});

const User = model("User", registerSchema);
export default User;
