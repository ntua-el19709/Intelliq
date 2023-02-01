const express = require('express');
const router = express.Router();

router.get('/:questionnaireID/:questionID', async (req, res) => {
    try {
        const pool = await require('./../dbconnector');
        const conn = await pool.getConnection();
        try {
            const results = await conn.query(
                `SELECT * FROM question
                INNER JOIN q_option ON question.questionnaire_id = q_option.questionnaire_id AND question.q_id = q_option.q_id
                WHERE question.questionnaire_id = ? AND question.q_id = ?`,
                [req.params.questionnaireID, req.params.questionID]
            );

            let json_q = {
                "questionnaireID": req.params.questionnaireID,
                "qID": req.params.questionID,
                "qtext": results[0].q_text,
                "type": (results[0].is_profile ? "profile" : "question"),
                "options": []
            };

            for (elem of results) {
                json_q.options.push({
                    "optID": elem.opt_id,
                    "opttxt": elem.opt_text,
                    "nextqID": elem.nextq_id
                });
            }

            res.status(200).json(json_q);
            console.log("Successful retrieval of questionnaire!");
        } finally {
            conn.release();
        }
    } catch (err) {
        res.status(500).json({"status": "failed"});
        console.log(err);
    }
})

module.exports = router;
