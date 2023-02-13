const express = require('express');
const apiutils = require('../../apiutils');
const router = express.Router();
// multer used for handling multipart/form-data encoding
const multer = require('multer');

async function insertQuestion(conn, question, questionnaire_id) {
    await conn.query(
        "INSERT INTO question (questionnaire_id, q_id, q_text, is_profile) VALUES (?, ?, ?, ?)",
        [questionnaire_id, question.qID, question.qtext, (question.type == "profile")]
    );

    for (option of question.options) {
        await conn.query(
            "INSERT INTO q_option (questionnaire_id, opt_id, q_id, opt_text, nextq_id) VALUES (?, ?, ?, ?, ?)",
            [questionnaire_id, option.optID, question.qID, option.opttxt, option.nextqID]
        );
    }
}

router.post('/', multer().any(), async (req, res) => {
    await apiutils.requestWrapper(false, req, res,
    "Successful upload of new questionnaire!", async (conn) => {
        const json_new_quest = JSON.parse(req.files[0].buffer.toString());

        try {
            await conn.beginTransaction();

            await conn.query(
                "INSERT INTO questionnaire (questionnaire_id, title) VALUES (?, ?)",
                [json_new_quest.questionnaireID, json_new_quest.questionnaireTitle]
            );

            for (keyword of json_new_quest.keywords) {
                await conn.query(
                    "INSERT INTO keywords (questionnaire_id, word) VALUES (?, ?)",
                    [json_new_quest.questionnaireID, keyword]
                );
            }

            for (question of json_new_quest.questions) {
                await insertQuestion(conn, question, json_new_quest.questionnaireID);
            }

            await conn.commit();
        } catch (err) {
            conn.rollback();
            throw err;
        }
    });
});

module.exports = router;
