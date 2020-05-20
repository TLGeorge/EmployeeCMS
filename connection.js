const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "2400",
    database: "employee_cms_db",
});

connection.connect(function (err) {
    if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;