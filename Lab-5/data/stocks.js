const axios = require("axios").default;

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data; // this will be the array of people objects
}

function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    throw `Not a string`;
  }
  if (val.trim().length == 0) {
    throw `Empty String Passed`;
  }
}

let exportedMethods = {
  async getAllStocks() {
    const stocksData = await getStocks();
    return await stocksData;
  },

  async getStockById(id) {
    checkIsProperString(id);
    let stockData = await getStocks();
    for (let i = 0; i < stockData.length; i++) {
      if (stockData[i]["id"] == id) {
        return stockData[i];
      }
    }
    throw `stock not found`;
  },
};

module.exports = exportedMethods;
