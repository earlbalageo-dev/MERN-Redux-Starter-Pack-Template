import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../api/admin.js";

import { authJwt } from "../middleware/jwtPassport.js";

const router = express.Router();
router.use(authJwt);
router.use(isAdmin());

router.get("/get-all-users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);
router.delete("/user/:id", deleteUserById);

export default router;
