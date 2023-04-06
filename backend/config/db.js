import mysql from "mysql";
import dontenv from "dotenv";

dontenv.config();

const env = process.env.NODE_ENV;

const dbConnProd = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

let dbConn = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PWD,
  database: process.env.LOCAL_DB_NAME,
  multipleStatements: true,
});

if (env === "prod") {
  dbConn = dbConnProd;
}

export default dbConn;
