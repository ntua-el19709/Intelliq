const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const conn_str = "softenguser@localhost:3306/intelliqdb"
    try {
        const pool = await require('./../../dbconnector')
        const conn = await pool.getConnection()
        try {
            await conn.ping()
            res.status(200).json({"status": "OK", "dbconnection": conn_str})
            console.log("Successful connection to database!")
        } finally {
            conn.release()
        }
    } catch (err) {
        res.status(500).json({"status": "failed", "dbconnection": conn_str})
        console.log("Failed to connect to database", err)
    }
})

module.exports = router
