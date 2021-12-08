import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  firstName: {
    type: String,
    required: true,
    minlength: [2, "First Name is Too Short"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, "Last Name is Too Short"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password Has To Be Longer Than 5 Characters"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEmailConfirm: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//match Entered password and encrypted password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
