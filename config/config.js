require("dotenv").config();
module.exports = {
  development: {
    // username: process.env.Database_User,
    // password: process.env.Database_Pass,
    // database: process.env.Database_Name,
    // host: process.env.Database_Host,
    username: "sql11525406",
    password: "glIQHZzqyM",
    database: "sql11525406",
    host: "sql11.freemysqlhosting.net",
    port: 3306,
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
    username: "sql11525406",
    password: "glIQHZzqyM",
    database: "sql11525406",
    host: "sql11.freemysqlhosting.net",
    port: 3306,
    dialect: "mysql",
  },
};
