const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("pages/index");
  } catch (e) {
    res.status(400).json({ error: "Internal Server Error" });
    return;
  }
});

module.exports = router;
