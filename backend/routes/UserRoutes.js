import express from "express";
const router = express.Router();

import {
  authUser,
  createGroup,
  getGroupDetails,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from "../controllers/UserController.js";
import { admin, protect } from "../middleware/AuthMiddleware.js";

router.route("/").post(registerUser).get(protect, getUsers);

router.post("/login", authUser);

router
  .route("/groups")
  .get(protect, getGroupDetails)
  .post(protect, createGroup);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
