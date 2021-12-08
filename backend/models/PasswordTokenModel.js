import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const passwordTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.PASSWORD_TOKEN_EXPIRE, //3600 = 1 hour
  },
});

//match Entered token and encrypted token in the DB
passwordTokenSchema.methods.matchToken = async function (enteredToken) {
  return await bcrypt.compare(enteredToken, this.token);
};

const PasswordToken = mongoose.model("PasswordToken", passwordTokenSchema);
export default PasswordToken;
