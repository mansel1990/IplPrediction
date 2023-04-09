import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";

const getStartEndPoint = (startDate, selectedMonth = null) => {
  const date = new Date();
  let currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();

  if (selectedMonth) {
    currentMonth = selectedMonth;
  }

  let startPoint = "",
    endPoint = "";

  if (currentDate <= startDate) {
    startPoint = `${currentYear}-${currentMonth}-${startDate}`;
    endPoint = `${currentYear}-${currentMonth + 1}-${startDate}`;
  } else {
    startPoint = `${currentYear}-${currentMonth + 1}-${startDate}`;
    endPoint = `${currentYear}-${currentMonth + 2}-${startDate}`;
  }
  return { startPoint, endPoint };
};

export const addExpense = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, amount, category, date } = req.body;
    const { id, group_id } = req.user;

    let formattedDate = new Date(date);
    formattedDate = new Date(
      formattedDate.getTime() +
        Math.abs(formattedDate.getTimezoneOffset() * 60000)
    );
    formattedDate = formattedDate.toJSON().slice(0, 19).replace("T", " ");

    if (name && amount && category) {
      const insertExpense = `INSERT INTO u932593839_ipl.expense
      (name, amount, category, createdDate, user_id, group_id)
      VALUES('${name}', '${amount}', '${category}', '${formattedDate}', '${id}', '${group_id}');`;
      const insertResult = await query(insertExpense);

      const startDateQuery = `select start_date from groups where group_id = '${group_id}'`;
      const startDateResult = await query(startDateQuery);
      const startDate = startDateResult[0].start_date;
      const { startPoint, endPoint } = getStartEndPoint(startDate);

      const expenses = `SELECT * 
            FROM u932593839_ipl.expense 
            where group_id='${group_id}' 
            and user_id='${id}'
            and createdDate BETWEEN '${startPoint}' and '${endPoint}'`;
      const result = await query(expenses);

      res.status(201).json(result);
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
    const { month: selectedMonth } = req.body;
    const startDateQuery = `select start_date from groups where group_id = '${group_id}'`;
    const startDateResult = await query(startDateQuery);
    const startDate = startDateResult[0].start_date;

    const { startPoint, endPoint } = getStartEndPoint(startDate, selectedMonth);

    const expenses = `SELECT * 
        FROM u932593839_ipl.expense 
        where group_id='${group_id}' 
        and user_id='${id}'
        and createdDate BETWEEN '${startPoint}' and '${endPoint}'
        order by expense_id desc`;
    const result = await query(expenses);

    result.map(
      (e) => (e.createdDate = e.createdDate.toLocaleDateString("ja-JP"))
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
