const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/:id", async (req, res) => {
  try {
    const people = await peopleData.getPersonById(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: "Person not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const peopleList = await peopleData.getAllPeople();
    res.json(peopleList);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  // Not implemented
  res.status(501).json({ message: "Incorrect request" });
});

router.delete("/", async (req, res) => {
  // Not implemented
  res.status(501).json({ message: "Incorrect request" });
});

module.exports = router;
