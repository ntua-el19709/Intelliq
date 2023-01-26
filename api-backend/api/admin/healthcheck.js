const express = require('express')
const router = express.Router()
const pool = require('./../../dbconnector')

router.get('/', (req, res) => {
    pool.getConnection((err, conn) => {
        const conn_str = "softenguser@localhost:3306/intelliqdb"
        if (err) {
            res.status(500).json({"status": "failed", "dbconnection": conn_str})
            console.log("Failed to connect to database", err)
        } else {
            res.status(200).json({"status": "OK", "dbconnection": conn_str})
            console.log("Successful connection to database!")
            conn.release()
        }
    })
})

module.exports = router
