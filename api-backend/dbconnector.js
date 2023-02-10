const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "softenguser",
    password: "password",
    database: "intelliqdb",
    charset: 'utf8mb4',
    connectionLimit: 100,
    multipleStatements: true
});

module.exports = pool;