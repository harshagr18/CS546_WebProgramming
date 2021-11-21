// PEOPLE.JSON : https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json

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

function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `One of the elements is not a number`;
  }

  if (isNaN(val)) {
    throw `One of the elements is invalid`;
  }
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
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
}

async function sameStreet(streetName, streetSuffix) {
  checkIsProperString(streetName);
  checkIsProperString(streetSuffix);
  let peopleData = await getPeople();
  let temp = [];
  for (i = 0; i < peopleData.length; i++) {
    if (
      peopleData[i]["address"]["home"]["street_name"].toUpperCase() ==
        streetName.toUpperCase() &&
      peopleData[i]["address"]["home"]["street_suffix"].toUpperCase() ==
        streetSuffix.toUpperCase()
    ) {
      temp.push(peopleData[i]);
    } else {
      if (
        peopleData[i]["address"]["work"]["street_name"].toUpperCase() ==
          streetName.toUpperCase() &&
        peopleData[i]["address"]["work"]["street_suffix"].toUpperCase() ==
          streetSuffix.toUpperCase()
      ) {
        temp.push(peopleData[i]);
      }
    }
  }
  if (temp.length > 1) {
    return temp;
  } else {
    throw `No 2 people live/work on the given street`;
  }
}

async function manipulateSsn() {
  if (arguments.length != 0) {
    throw `Argument passed error`;
  }
  let final = {};
  let ssnList = [];
  let temp = 0;
  let avg = 0;
  peopleData = await getPeople();
  for (let i = 0; i < peopleData.length; i++) {
    temp = parseInt(
      peopleData[i]["ssn"].replace(/-/g, "").split("").sort().join("")
    );
    ssnList.push(temp);
    avg += temp;
  }
  final["highest"] = {
    firstName: peopleData[ssnList.indexOf(Math.max(...ssnList))]["first_name"],
    lastName: peopleData[ssnList.indexOf(Math.max(...ssnList))]["last_name"],
  };
  final["lowest"] = {
    firstname: peopleData[ssnList.indexOf(Math.min(...ssnList))]["first_name"],
    lastName: peopleData[ssnList.indexOf(Math.min(...ssnList))]["last_name"],
  };
  final["average"] = Math.floor(avg / peopleData.length);
  return final;
}

async function sameBirthday(month, day) {
  peopleData = await getPeople();
  let final = [];
  let tempM = "";
  let tempD = "";
  myList = [];
  month = parseInt(month);
  day = parseInt(day);
  checkIsProperNumber(month);
  checkIsProperNumber(day);
  if (
    !(
      (day > 0 && day <= 31 && month == 1) ||
      (day > 0 && day <= 28 && month == 2) ||
      (day > 0 && day <= 31 && month == 3) ||
      (day > 0 && day <= 30 && month == 4) ||
      (day > 0 && day <= 31 && month == 5) ||
      (day > 0 && day <= 30 && month == 6) ||
      (day > 0 && day <= 31 && month == 7) ||
      (day > 0 && day <= 31 && month == 8) ||
      (day > 0 && day <= 30 && month == 9) ||
      (day > 0 && day <= 31 && month == 10) ||
      (day > 0 && day <= 30 && month == 11) ||
      (day > 0 && day <= 31 && month == 12)
    )
  ) {
    throw `Incorrect Day and Month combination`;
  }
  for (let i = 0; i < peopleData.length; i++) {
    tempM = peopleData[i]["date_of_birth"].replace("/", "").slice(0, 2);
    tempD = peopleData[i]["date_of_birth"].replace("/", "").slice(2, 4);
    if (tempM == month && tempD == day) {
      final.push(
        peopleData[i]["first_name"] + " " + peopleData[i]["last_name"]
      );
    }
  }
  return final;
}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
};
