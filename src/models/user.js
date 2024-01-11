import mongoose from "mongoose";

// Video 1:38:50

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
