import mysql from "mysql2";
import dontenv from "dotenv";

dontenv.config();

const env = process.env.NODE_ENV;

const dbConnProd = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 100000,
  host: process.env.DB_HOST,
  port: "3306",
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

let dbConn = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 100000,
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PWD,
  database: process.env.LOCAL_DB_NAME,
  multipleStatements: true,
});

if (env === "prod") {
  dbConn = dbConnProd;
}

// dbConn = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: "3306",
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME,
//   debug: true,
// });

export default dbConn;
