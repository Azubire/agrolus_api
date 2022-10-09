require("dotenv").config();
module.exports = {
  development: {
    // username: process.env.Database_User,
    // password: process.env.Database_Pass,
    // database: process.env.Database_Name,
    // host: process.env.Database_Host,
    username: "sql8525211",
    password: "P8tIf3iEVY",
    database: "sql8525211",
    host: "sql8.freemysqlhosting.net",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "epiz_32753856",
    password: "YKpmruUt2tW",
    database: "epiz_32753856_agroplus",
    host: "sql203.epizy.com",
    dialect: "mysql",
  },
};
