const e = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data");
const marvelData = data.marvel;

function checkIsProperString(val) {
  if (!val) {
    return true;
  }
  if (typeof val !== "string") {
    return true;
  }

  if (val.length == 0) {
    return true;
  }
  if (val.trim().length == 0) {
    return true;
  }
}

router.get("/", async (req, res) => {
  res.render("pages/index", { pageTitle: "Character Finder" });
});

router.post("/search", async (req, res) => {
  let searchSubmitData = req.body;
  if (
    !searchSubmitData.searchTerm ||
    checkIsProperString(searchSubmitData.searchTerm)
  ) {
    res.render("pages/error", {
      error: "Incorrect search",
      pageTitle: "Error",
    });
    return;
  }

  heroData = await marvelData.search(searchSubmitData.searchTerm);

  //res.render("pages/heroes");
  res.render("pages/heroes", {
    heroData: heroData,
    searchTerm: searchSubmitData.searchTerm,
    pageTitle: "Characters Found",
  });
});

router.get("/characters/:id", async (req, res) => {
  try {
    const data = await marvelData.get(req.params.id);
    res.render("pages/character", { heroData: data, pageTitle: data.name });
  } catch (e) {
    res.render("pages/error", { error: "Invalid ID", pageTitle: "Error" });
  }
});

module.exports = router;
