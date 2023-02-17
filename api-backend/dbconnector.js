const mysql = require('promise-mysql');

if (process.env.NODE_ENV === "test") {
    const pool = mysql.createPool({
        host: "localhost",
        user: "softenguser",
        password: "password",
        database: "intelliqdb_test",
        charset: 'utf8mb4',
        connectionLimit: 100,
        multipleStatements: true
    });
} else {
    const pool = mysql.createPool({
        host: "localhost",
        user: "softenguser",
        password: "password",
        database: "intelliqdb",
        charset: 'utf8mb4',
        connectionLimit: 100,
        multipleStatements: true
    });
}

module.exports = pool;