const express = require('express');
const apiutils = require('../apiutils');
const Parser = require('@json2csv/plainjs').Parser;
const router = express.Router();

async function convert2json(data) {
    let new_data = [];
    for (quest of data.answers) {
        new_data.push({
            "questionnaireID": data.questionnaireID,
            "questionID": data.questionID,
            "session": quest.session,
            "ans": quest.ans
        });
    }
    opts = {
        fields: ["questionnaireID", "questionID", "session", "ans"]
    };
    return new Parser(opts).parse(new_data);
}

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

        if (req.query.format == 'csv') {
            return await convert2json(json_res);
        } else {
            return json_res;
        }
    });
})

module.exports = router;
