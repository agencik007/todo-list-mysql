const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megakurs_todo_list',
  decimalNumbers: true,
  namedPlaceholders: true,
  // multipleStatements: true,
});

module.exports = {
  pool,
}
