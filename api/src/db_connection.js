const mysql = require("mysql");

const con = mysql.createConnection({
  host: "bd",
  user: "root",
  password: "toor",
  database: "db_fiap",
});

module.exports = con;
