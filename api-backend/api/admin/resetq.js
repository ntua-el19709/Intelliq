const express = require('express');
const apiutils = require('../../apiutils');
const router = express.Router();

router.post('/:questionnaireID', async (req, res) => {
    await apiutils.requestWrapper(false, req, res,
    "Successful reset of questionnaire answers!", async (conn) => {
        await conn.query(
            `DELETE FROM answer
            WHERE questionnaire_id = ?`,
            [req.params.questionnaireID]
        );
    });
})

module.exports = router;
