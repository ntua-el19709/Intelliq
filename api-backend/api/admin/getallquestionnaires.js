const express = require('express');
const apiutils = require('../../apiutils');
const Parser = require('@json2csv/plainjs').Parser;
const router = express.Router();

router.get('/', async (req, res) => {
    await apiutils.requestWrapper(true, req, res,
    "Successful retrieval of all questionnaires!", async (conn) => {
        const ans_list = await conn.query("SELECT * FROM questionnaire");
        
        json_res = [];
        for (elem of ans_list) {
            json_res.push({
                "questionnaireID": elem.questionnaire_id,
                "questionnaireTitle": elem.title
            });
        }

        if (req.query.format == 'csv') {
            const opts = {
                fields: ["questionnaireID", "questionnaireTitle"]
            };
            return new Parser(opts).parse(json_res);
        } else {
            return json_res;
        }
    });
})

module.exports = router;
