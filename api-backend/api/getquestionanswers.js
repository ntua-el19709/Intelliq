const express = require("express");
const router = express.Router();

router.get("/:questionnaireID/:questionID", async (req, res) => {
  try {
    let json_q = require(`./../ansfiles/stats${req.params.questionID}`);
    res.status(200).json(json_q);
    console.log("Successful retrieval of question statistics!");
  } catch (err) {
    res.status(500).json({ status: "failed" });
    console.log(err);
  }
});

module.exports = router;
