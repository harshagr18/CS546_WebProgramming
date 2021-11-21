const fs = require("fs");

const people = require("./people");
const stocks = require("./stocks");

async function main() {
  try {
    const personById = await people.getPersonById(
      "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"
    );
    console.log(personById);
  } catch (e) {
    console.log(e);
  }
  try {
    const sameStreet = await people.sameStreet("Sutherland", "Point");
    console.log(sameStreet);
  } catch (e) {
    console.log(e);
  }
  try {
    const manSsn = await people.manipulateSsn();
    console.log(manSsn);
  } catch (e) {
    console.log(e);
  }
  try {
    const sameBday = await people.sameBirthday(09, 25);
    console.log(sameBday);
  } catch (e) {
    console.log(e);
  }
  try {
    const listHolders = await stocks.listShareholders();
    console.log(listHolders);

    const data = JSON.stringify(listHolders);

    // write JSON string to a file
    fs.writeFile("user.json", data, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  } catch (e) {
    console.log(e);
  }
  try {
    const topHolder = await stocks.topShareholder(
      "Aeglea BioTherapeutics, Inc."
    );
    console.log(topHolder);
  } catch (e) {
    console.log(e);
  }

  try {
    const stockList = await stocks.listStocks("Grenville", "Pawelke");
    console.log(stockList);
  } catch (e) {
    console.log(e);
  }
  try {
    const stockId = await stocks.getStockById(
      "f652f797-7ca0-4382-befb-2ab8be914ff0"
    );
    console.log(stockId);
  } catch (e) {
    console.log(e);
  }
}

main();
