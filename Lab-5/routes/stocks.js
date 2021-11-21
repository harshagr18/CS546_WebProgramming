const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/:id", async (req, res) => {
  try {
    const stock = await stocksData.getStockById(req.params.id);
    res.json(stock);
  } catch (e) {
    res.status(404).json({ message: "Stock not found!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const stockList = await stocksData.getAllStocks();
    res.json(stockList);
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
