const express = require('express');
const apiutils = require('../apiutils');
const router = express.Router();

router.get('/:questionnaireID', async (req, res) => {
    await apiutils.requestWrapper(true, req, res,
    "Successful retrieval of questionnaire!", async (conn) => {
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

        return json_quest;
    });
})

module.exports = router;
