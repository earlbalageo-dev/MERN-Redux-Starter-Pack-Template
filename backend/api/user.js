import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import EmailToken from "../models/EmailTokenModel.js";
import PasswordToken from "../models/PasswordTokenModel.js";

import { requestPasswordReset } from "../service/passwordReset.js";
import { sendEmailVerificationToUser } from "../service/emailVerification.js";

//@desc      Creates a new user
//@route     POST /v1/api/users/register
//@access    Public
const register = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
  });

  if (user) {
    const email = await sendEmailVerificationToUser(user._id);

    if (!email.success) {
      res.status(400);
      throw new Error(email.error);
    }

    res.status(201).json({
      message: "Registration Success, Please Verify Your Email Address",
      userInfo: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailConfirm: user.isEmailConfirm,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Something went wrong on our side, please try again later");
  }
});

//@desc      Login a user
//@route     POST /v1/api/users/login
//@access    Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      userInfo: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailConfirm: user.isEmailConfirm,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email and password does not match");
  }
});

//@desc      Remove user from database
//@route     DELETE /v1/api/users/delete-user
//@access    Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user && (await user.matchPassword(req.body.password))) {
    user.deleteOne();
    res.status(200).json({ message: "SUCCESS: User has been deleted" });
  } else {
    res.status(401);
    throw new Error("wrong password");
  }
});

//@desc      Update user profile
//@route     PUT /v1/api/users/update-profile
//@access    Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { newEmail, newFirstName, newLastName, verifyPassword } = req.body;

  const emailExists = await User.findOne({ email: newEmail });

  if (emailExists && newEmail !== user.email) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const passwordMatch = await user.matchPassword(verifyPassword);

  if (verifyPassword && passwordMatch) {
    user.email = newEmail || user.email;
    user.firstName = newFirstName || user.firstName;
    user.lastName = newLastName || user.lastName;

    const updatedUser = await user.save();

    res.json({
      userInfo: {
        _id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });
  } else {
    res.status(401);
    throw new Error("Wrong Password");
  }
});

//@desc      Update user password
//@route     PUT /v1/api/users/update-password
//@access    Private
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { currentPassword, newPassword } = req.body;

  const passwordMatch = await user.matchPassword(currentPassword);

  if (passwordMatch) {
    user.password = newPassword;
    await user.save();

    res.status(201).json({ message: "Password Updated!!" });
  } else {
    res.status(401);
    throw new Error("Wrong Password");
  }
});

//@desc      Re-Send a verification email to user
//@route     GET /v1/api/users/send-verification-email
//@access    Private
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const email = await sendEmailVerificationToUser(req.user._id);

  if (!email.success) {
    res.status(400);
    throw new Error(email.error);
  }
  res.status(200).json({ message: "Email Verification Sent!!" });
});

//@desc      Verify emailToken if valid
//@route     POST /v1/api/users/verify-email-success
//@access    Private
const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, token } = req.body;

  let user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  let emailToken = await EmailToken.findOne({ userId });

  if (emailToken && (await emailToken.matchToken(token))) {
    user.isEmailConfirm = true;
    await user.save();
    await emailToken.deleteOne();
    res.status(200).json({ message: "SUCCESS: Email Is Now Verified" });
  } else {
    res.status(400);
    throw new Error("Email verification link invalid or expired");
  }
});

//@desc      Forgot Password
//@route     GET /v1/api/users/forgot-password
//@access    Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailSent = await requestPasswordReset(email);

  if (!emailSent.success) {
    res.status(400);
    throw new Error(email.error);
  }

  res.status(200).json({
    message:
      "an email will be sent to this email if an account is registered under it.",
  });
});

//@desc      Reset Password
//@route     POST /v1/api/users/reset-password
//@access    Private
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token, newPassword } = req.body;

  let user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("Password link invalid or expired");
  }

  let passwordToken = await PasswordToken.findOne({ userId });

  if (passwordToken && (await passwordToken.matchToken(token))) {
    user.password = newPassword;
    await user.save();
    await passwordToken.deleteOne();
    res.status(200).json({ message: "SUCCESS: Password has been reset" });
  } else {
    res.status(400);
    throw new Error("Password link invalid or expired");
  }
});

export {
  register,
  login,
  updatePassword,
  updateProfile,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  deleteUser,
};
