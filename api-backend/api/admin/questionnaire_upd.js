const express = require('express')
const router = express.Router()
// multer used for handling multipart/form-data encoding
const multer = require('multer')

async function insertQuestion(conn, question, questionnaire_id) {
    await conn.query(
        "INSERT INTO question (questionnaire_id, q_id, q_text, is_profile) VALUES (?, ?, ?, ?)",
        [questionnaire_id, question.qID, question.qtext, (question.type == "profile")]
    )

    for (option of question.options) {
        await conn.query(
            "INSERT INTO q_option (questionnaire_id, opt_id, q_id, opt_text, nextq_id) VALUES (?, ?, ?, ?, ?)",
            [questionnaire_id, option.optID, question.qID, option.opttxt, option.nextqID]
        )
    }
}

router.post('/', multer().any(), async (req, res) => {
    try {
        const json_new_quest = JSON.parse(req.files[0].buffer.toString())

        // TODO: validate data? Or maybe just implement all
        // following SQL queries using a transaction

        const pool = await require('./../../dbconnector')
        const conn = await pool.getConnection()
        try {
            await conn.query(
                "INSERT INTO questionnaire (questionnaire_id, title) VALUES (?, ?)",
                [json_new_quest.questionnaireID, json_new_quest.questionnaireTitle]
            )

            for (keyword of json_new_quest.keywords) {
                await conn.query(
                    "INSERT INTO keywords (questionnaire_id, word) VALUES (?, ?)",
                    [json_new_quest.questionnaireID, keyword]
                )
            }

            for (question of json_new_quest.questions) {
                await insertQuestion(conn, question, json_new_quest.questionnaireID)
            }

            res.status(200).json({"status": "OK"})
            console.log("Successful upload of new questionnaire!")
        } finally {
            conn.release()
        }
    } catch (err) {
        res.status(500).json({"status": "failed"})
        console.log(err)
    }
})

module.exports = router
