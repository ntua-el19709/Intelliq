const express = require('express');
const apiutils = require('../apiutils');
const router = express.Router();

router.get('/:questionnaireID/:questionID', async (req, res) => {
    await apiutils.requestWrapper(true, req, res,
    "Successful retrieval of question answers!", async (conn) => {
        let json_res = {
            "questionnaireID": req.params.questionnaireID,
            "questionID": req.params.questionID,
            "answers": []
        };

        const ans_list = await conn.query(
            `SELECT * FROM answer
            WHERE questionnaire_id = ? AND q_id = ?`,
            [req.params.questionnaireID, req.params.questionID]
        );
        
        for (elem of ans_list) {
            json_res.answers.push({
                "session": elem.session_id,
                "ans": elem.ans
            })
        }

        return json_res;
    });
})

module.exports = router;
