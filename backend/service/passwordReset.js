import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import PasswordToken from "../models/PasswordTokenModel.js";
import sendEmail from "../utils/sendEmail.js";

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  let token = await PasswordToken.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const hash = await bcrypt.hash(resetToken, salt);

  const passwordToken = await new PasswordToken({
    userId: user._id,
    token: hash,
  }).save();

  if (!passwordToken) {
    return { success: false, error: "Failed to generate Token" };
  }

  const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
  const emailSent = await sendEmail(
    user.email,
    "reset password",
    link,
    "passwordReset"
  );

  if (!emailSent) {
    return { success: false, error: "Failed to send reset password email" };
  }
  return { success: true };
};

export { requestPasswordReset };
