require('dotenv').config()

const mysql = require('mysql');
const pool  = mysql.createPool({
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.PASSWORD,
  database : process.env.DBNAME,
});

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});

module.exports = pool
