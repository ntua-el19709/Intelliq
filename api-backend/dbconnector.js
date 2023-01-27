const mysql = require('mysql')
const pool = mysql.createPool({
    host: "localhost",
    user: "softenguser",
    password: "password",
    database: "intelliqdb",
    multipleStatements: true
})

module.exports = pool