import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import EmailToken from "../models/EmailTokenModel.js";
import sendEmail from "../utils/sendEmail.js";

const sendEmailVerificationToUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { success: false, error: "User Does Not Exist" };
  }

  let token = await EmailToken.findOne({ userId });

  if (token) {
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const hash = await bcrypt.hash(resetToken, salt);

  const emailToken = await new EmailToken({
    userId: user._id,
    token: hash,
  }).save();

  if (!emailToken) {
    return { success: false, error: "Failed to generate Token" };
  }

  const link = `${process.env.CLIENT_URL}/verifyEmailAddress?token=${resetToken}&id=${user._id}`;

  const emailSent = await sendEmail(
    user.email,
    "email verification",
    link,
    "emailConfirmation"
  );

  if (!emailSent) {
    return { success: false, error: "Failed to send verification email" };
  }

  return { success: true };
};

export { sendEmailVerificationToUser };
