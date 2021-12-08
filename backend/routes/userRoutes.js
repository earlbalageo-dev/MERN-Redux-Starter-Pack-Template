import express from "express";
const router = express.Router();
import {
  register,
  login,
  updatePassword,
  updateProfile,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  deleteUser,
} from "../api/user.js";

import { authJwt } from "../middleware/jwtPassport.js";

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authJwt, updateProfile);
router.put("/update-password", authJwt, updatePassword);
router.delete("/delete-user", authJwt, deleteUser);

router.get("/send-verification-email", authJwt, sendVerificationEmail);
router.post("/verify-email-success", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
