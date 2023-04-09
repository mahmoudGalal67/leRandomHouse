const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "mahmoud-galal",
//   password: "Seriallkiller@67",
//   database: "lerandomhouse",
// });

// export const db = mysql.createPool({
//   connectionLimit: 100,
//   host: "sql9.freesqldatabase.com",
//   user: "sql9597044",
//   password: "5H4BmcweNa",
//   database: "sql9597044",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "seriallkiller",
  database: "lerandom",
});

module.exports = { db };
