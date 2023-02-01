const express = require('express');
const router = express.Router();

router.post('/:questionnaireID/:questionID/:session/:optionID', async (req, res) => {
    try {
        const pool = await require('./../dbconnector');
        const conn = await pool.getConnection();
        try {
            await conn.query(
                "INSERT INTO answer (questionnaire_id, q_id, session_id, ans) VALUES (?, ?, ?, ?)",
                [req.params.questionnaireID, req.params.questionID,
                req.params.session, req.params.optionID]
            );

            res.status(200).json({ "status": "OK" });
            console.log("Successful answer to question!");
        } finally {
            conn.release();
        }
    } catch (err) {
        res.status(500).json({ "status": "failed" });
        console.log(err);
    }
});

module.exports = router;
