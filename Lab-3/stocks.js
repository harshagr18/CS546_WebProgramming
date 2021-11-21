//  STOCKS.JSON : https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json

const axios = require("axios").default;

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data; // this will be the array of people objects
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
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

async function listShareholders() {
  if (arguments.length != 0) {
    throw `Argument passed error`;
  }
  peopleData = await getPeople();
  stockData = await getStocks();

  for (let i = 0; i < stockData.length; i++) {
    for (let j = 0; j < stockData[i]["shareholders"].length; j++) {
      for (let k = 0; k < peopleData.length; k++) {
        if (stockData[i]["shareholders"][j]["userId"] == peopleData[k]["id"]) {
          delete stockData[i]["shareholders"][j]["userId"];
          stockData[i]["shareholders"][j]["first_name"] =
            peopleData[k]["first_name"];
          stockData[i]["shareholders"][j]["last_name"] =
            peopleData[k]["last_name"];
        }
      }
    }
  }
  return stockData;
}

async function topShareholder(stockName) {
  checkIsProperString(stockName);
  let peopleData = await getPeople();
  let stockData = await getStocks();

  for (let i = 0; i < stockData.length; i++) {
    for (let j = 0; j < stockData[i]["shareholders"].length; j++) {
      for (let k = 0; k < peopleData.length; k++) {
        if (stockData[i]["shareholders"][j]["userId"] == peopleData[k]["id"]) {
          delete stockData[i]["shareholders"][j]["userId"];
          stockData[i]["shareholders"][j]["first_name"] =
            peopleData[k]["first_name"];
          stockData[i]["shareholders"][j]["last_name"] =
            peopleData[k]["last_name"];
        }
      }
    }
  }

  for (let i = 0; i < stockData.length; i++) {
    if (stockData[i]["stock_name"] == stockName) {
      if (stockData[i]["shareholders"].length == 0) {
        return `${stockName} currently has no shareholders.`;
      } else {
        let high = stockData[i]["shareholders"][0]["number_of_shares"];
        for (let j = 0; j < stockData[i]["shareholders"].length; j++) {
          if (high <= stockData[i]["shareholders"][j]["number_of_shares"]) {
            high = stockData[i]["shareholders"][j]["number_of_shares"];
          }
        }
        for (let j = 0; j < stockData[i]["shareholders"].length; j++) {
          if (high == stockData[i]["shareholders"][j]["number_of_shares"]) {
            return `With ${high} shares in ${stockName}, ${stockData[i]["shareholders"][j]["first_name"]} ${stockData[i]["shareholders"][j]["last_name"]} is the top shareholder`;
          }
        }
      }
    }
  }
  throw `No stock with that name`;
}

async function listStocks(firstName, lastName) {
  checkIsProperString(firstName);
  checkIsProperString(lastName);
  let peopleData = await getPeople();
  let stockData = await getStocks();
  let userId = "";
  let final = [];
  let flag = 0;

  for (let i = 0; i < peopleData.length; i++) {
    if (
      peopleData[i]["first_name"].toUpperCase() == firstName.toUpperCase() &&
      peopleData[i]["last_name"].toUpperCase() == lastName.toUpperCase()
    ) {
      userId = peopleData[i]["id"];
      flag = 1;
    }
  }
  if (flag == 0) {
    throw `Person not found`;
  }
  for (let j = 0; j < stockData.length; j++) {
    for (let k = 0; k < stockData[j]["shareholders"].length; k++) {
      if (stockData[j]["shareholders"][k]["userId"] == userId) {
        final.push({
          stock_name: stockData[j]["stock_name"],
          number_of_shares: stockData[j]["shareholders"][k]["number_of_shares"],
        });
      }
    }
  }
  return final;
}

async function getStockById(id) {
  checkIsProperString(id);
  let stockData = await getStocks();
  for (let i = 0; i < stockData.length; i++) {
    if (stockData[i]["id"] == id) {
      return stockData[i];
    }
  }
  throw `stock not found`;
}

module.exports = {
  listShareholders,
  topShareholder,
  listStocks,
  getStockById,
};
