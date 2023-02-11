const express = require("express");
const router = express.Router();
var fs = require("fs");
//router.post('/:questionnaireID/:questionID/:session/:optionID', async (req, res) => {
router.post("/:questionnaireID/:questionID/:optionID", async (req, res) => {
  try {
    console.log("helloooo");

    fs.writeFile(
      `ansfiles/QID${req.params.questionnaireID}qID${req.params.questionID}.txt`,
      `{"questionnaireID": "${req.params.questionnaireID}","qID": "${req.params.questionID}","optID": "${req.params.optionID}"}`,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );

    console.log("Successful answer to question!");
  } catch (err) {
    res.status(500).json({ status: "failed" });
    console.log(err);
  }
  /*
    try {
        const pool = await require('./../dbconnector');
        const conn = await pool.getConnection();
        try {
            await conn.query(
                "INSERT INTO answer (questionnaire_id, q_id, session_id, ans) VALUES (?, ?, ?, ?)",
                [req.params.questionnaireID, req.params.questionID,
                req.params.session, req.params.optionID]
            );

            res.status(200).json({ "status": "OK" });
            console.log("Successful answer to question!");
        } finally {
            conn.release();
        }
    } catch (err) {
        res.status(500).json({ "status": "failed" });
        console.log(err);
    }
    */
});

module.exports = router;
