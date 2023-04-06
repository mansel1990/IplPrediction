import express from "express";
const router = express.Router();

import { addExpense, getExpense } from "../controllers/ExpenseController.js";
import { protect } from "../middleware/AuthMiddleware.js";

router.route("/").get(protect, getExpense).post(protect, addExpense);

export default router;
