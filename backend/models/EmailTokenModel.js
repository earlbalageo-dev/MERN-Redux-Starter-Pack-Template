import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailTokenSchema = mongoose.Schema({
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
  },
});

//match Entered token and encrypted token in the DB
emailTokenSchema.methods.matchToken = async function (enteredToken) {
  return await bcrypt.compare(enteredToken, this.token);
};

const EmailToken = mongoose.model("EmailToken", emailTokenSchema);
export default EmailToken;
