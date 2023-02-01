const express = require('express');
const router = express.Router();

router.get('/:questionnaireID', async (req, res) => {
    try {
        const pool = await require('./../dbconnector');
        const conn = await pool.getConnection();
        try {
            const quest_results = await conn.query(
                "SELECT title FROM questionnaire WHERE questionnaire_id = ?",
                req.params.questionnaireID
            );

            let json_quest = {
                "questionnaireID": req.params.questionnaireID,
                "questionnaireTitle": quest_results[0].title,
                "keywords": [],
                "questions": []
            };

            (await conn.query(
                "SELECT word FROM keywords WHERE questionnaire_id = ?",
                req.params.questionnaireID
            )).forEach(keyw => json_quest.keywords.push(keyw.word));

            (await conn.query(
                "SELECT q_id, q_text, is_profile FROM question WHERE questionnaire_id = ?",
                req.params.questionnaireID
            )).forEach(q_obj => {
                json_quest.questions.push({
                    "qID": q_obj.q_id,
                    "qtext": q_obj.q_text,
                    "type": (q_obj.is_profile ? "profile" : "question")
                })
            });

            res.status(200).json(json_quest);
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
