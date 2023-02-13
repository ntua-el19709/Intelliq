const express = require('express');
const apiutils = require('../apiutils');
const Parser = require('@json2csv/plainjs').Parser;
const router = express.Router();

async function convert2json(data) {
    let new_data = [];
    for (quest of data.answers) {
        new_data.push({
            "questionnaireID": data.questionnaireID,
            "session": data.session,
            "qID": quest.qID,
            "ans": quest.ans
        });
    }
    opts = {
        fields: ["questionnaireID", "session", "qID", "ans"]
    };
    return new Parser(opts).parse(new_data);
}

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

        if (req.query.format == 'csv') {
            return await convert2json(json_res);
        } else {
            return json_res;
        }
    });
})

module.exports = router;
