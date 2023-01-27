const express = require('express')
const router = express.Router()
const pool = require('./../../dbconnector')

router.get('/', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                "status": "failed",
                "reason": "Failed to connect to the database."
            })
            console.log("Failed to connect to database: ", err);
        } else {
            const buffer = require('fs')
                    .readFileSync(__dirname + "/../../../database/reset_db.sql")

            conn.query(buffer.toString(), (error) => {
                if (error) {
                    res.status(500).json({
                        "status": "failed",
                        "reason": "Failed to execute DB query."
                    })
                    console.log("Failed to execute DB query: ", error)
                } else {
                    res.status(200).json({"status": "OK"})
                }
            })

            conn.release()
        }
    })
})

module.exports = router
