import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";

export const addExpense = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, amount, category, date } = req.body;
    const { id, group_id } = req.user;

    if (name && amount && category) {
      const insertUser = `INSERT INTO u932593839_ipl.expense
      (name, amount, category, createdDate, user_id, group_id)
      VALUES('${name}', '${amount}', '${category}', '${date}', '${id}', '${group_id}');`;
      const result = await query(insertUser);

      res.status(201).json({
        expenseId: result.insertId,
      });
    } else {
      res.status(400);
      throw new Error("Values Missing");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export const getExpense = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { id, group_id } = req.user;
    const expenses = `SELECT * FROM u932593839_ipl.expense where group_id='${group_id}' and user_id='${id}'`;
    const result = await query(expenses);

    res.status(201).json(result);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
