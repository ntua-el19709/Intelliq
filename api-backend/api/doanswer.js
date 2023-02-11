const express = require('express');
const apiutils = require('../apiutils');
const router = express.Router();

router.post('/:questionnaireID/:questionID/:session/:optionID', async (req, res) => {
    await apiutils.requestWrapper(false, req, res,
    "Successful answer to question!", async (conn) => {
        await conn.query(
            "INSERT INTO answer (questionnaire_id, q_id, session_id, ans) VALUES (?, ?, ?, ?)",
            [req.params.questionnaireID, req.params.questionID,
            req.params.session, req.params.optionID]
        );
    });
});

module.exports = router;
