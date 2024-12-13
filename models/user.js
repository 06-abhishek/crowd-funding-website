import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  username: { type: String },
  role: { type: String },
  profilePic: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  created_At: { type: Date, default: Date.now },
  updated_At: { type: Date, default: Date.now },
});
// Check if the model already exists to prevent re-compiling during hot reloads in development.
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;