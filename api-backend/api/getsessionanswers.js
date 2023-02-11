const express = require('express');
const apiutils = require('../apiutils');
const router = express.Router();

router.get('/:questionnaireID/:session', async (req, res) => {
    await apiutils.requestWrapper(true, req, res,
    "Successful retrieval of session answers!", async (conn) => {
        let json_res = {
            "questionnaireID": req.params.questionnaireID,
            "session": req.params.session,
            "answers": []
        };

        const ans_list = await conn.query(
            `SELECT * FROM answer
            WHERE questionnaire_id = ? AND session_id = ?
            ORDER BY q_id`,
            [req.params.questionnaireID, req.params.session]
        );
        
        for (elem of ans_list) {
            json_res.answers.push({
                "qID": elem.q_id,
                "ans": elem.ans
            })
        }

        return json_res;
    });
})

module.exports = router;
