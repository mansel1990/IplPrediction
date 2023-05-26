import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";

import productRoutes from "./routes/ProductRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import expenseRoutes from "./routes/ExpenseRoutes.js";
import { errorHandler, notFound } from "./middleware/ErrorMiddleware.js";
import dbConn from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

// dbConn.query(
//   "SELECT group_id, group_name, start_date, budget from u932593839_ipl.groups where group_id=9",
//   function (err, rows, fields) {
//     console.log("value of err: ", err);
//     console.log("value of rows: ", rows);
//     // console.log("value of fields: ", fields);
//   }
// );

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "prod") {
  console.log(__dirname);

  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.sendFile("Server is running!! YAH!!!!!!!!");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
