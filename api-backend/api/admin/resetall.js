const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const pool = await require('./../../dbconnector');
        const conn = await pool.getConnection();
        try {
            const buffer = await require('fs')
                .readFileSync(__dirname + "/../../../database/reset_db.sql");

            await conn.query(buffer.toString());

            res.status(204).json({ "status": "OK" });
            console.log("Successful reset of all tables.");
        } finally {
            conn.release();
        }
    } catch (err) {
        res.status(500).json({ "status": "failed", "reason": "DB error occured." });
        console.log(err);
    }
});

module.exports = router;
