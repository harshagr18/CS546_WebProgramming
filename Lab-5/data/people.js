const axios = require("axios").default;

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

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

let exportedMethods = {
  async getAllPeople() {
    const peopleData = await getPeople();
    return await peopleData;
  },

  async getPersonById(id) {
    checkIsProperString(id);
    let peopleData = await getPeople();
    let flag = 0;
    for (let i = 0; i < peopleData.length; i++) {
      if (peopleData[i]["id"] === id) {
        flag = 1;
        return peopleData[i];
      }
    }
    throw `Person not found`;
  },
};

module.exports = exportedMethods;
