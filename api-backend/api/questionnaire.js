const express = require('express');
const apiutils = require('../apiutils');
const Parser = require('@json2csv/plainjs').Parser;
const router = express.Router();

async function convert2json(data) {
    let new_data = [];
    for (quest of data.questions) {
        new_data.push({
            "questionnaireID": data.questionnaireID,
            "questionnaireTitle": data.questionnaireTitle,
            "keywords": data.keywords,
            "qID": quest.qID,
            "qtext": quest.qtext,
            "type": quest.type
        });
    }
    opts = {
        fields: ["questionnaireID", "questionnaireTitle", "keywords", "qID", "qtext", "type"]
    };
    return new Parser(opts).parse(new_data);
}

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

        if (req.query.format == 'csv') {
            return await convert2json(json_quest);
        } else {
            return json_quest;
        }
    });
})

module.exports = router;
