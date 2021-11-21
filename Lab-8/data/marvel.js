const axios = require("axios").default;
const md5 = require("blueimp-md5");

function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    throw `Not a string`;
  }

  if (val.length == 0) {
    throw `Length of string is 0`;
  }
  if (val.trim().length == 0) {
    throw `String is only spaces`;
  }
}

let exportedMethods = {
  async search(keywords) {
    checkIsProperString(keywords);
    const publickey = "abca2c0b119c151e4dfab9c766aa61dbad1";
    const privatekey = "abcde66fece3eb0f02d600ff8e5e6ce42b53fe53a8e";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
    const url =
      baseUrl +
      "?ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash +
      "&nameStartsWith=" +
      keywords;

    const { data } = await axios.get(url);
    let heroList = [];
    let count = 0;

    for (let i = 0; i < data["data"]["results"].length; i++) {
      let temp = {};
      temp["id"] = data["data"]["results"][i]["id"];
      temp["name"] = data["data"]["results"][i]["name"];
      heroList.push(temp);
      count++;
      if (count == 20) {
        return heroList;
      }
    }
    return heroList;
  },
  async get(id) {
    checkIsProperString(id);
    const publickey = "a2c0b119c151e4dfab9c766aa61dbad1";
    const privatekey = "de66fece3eb0f02d600ff8e5e6ce42b53fe53a8e";
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
    const url =
      baseUrl + id + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    const { data } = await axios.get(url);
    if (!data) {
      throw `Invalid ID`;
    }
    let dataToReturn = {};

    dataToReturn["name"] = data.data.results[0].name;
    dataToReturn["thumbPath"] = data.data.results[0].thumbnail.path;
    dataToReturn["thumbExt"] = data.data.results[0].thumbnail.extension;
    dataToReturn["desc"] = data.data.results[0].description;
    temp = [];

    for (let i = 0; i < data.data.results[0].comics.items.length; i++) {
      temp.push({ name: data.data.results[0].comics.items[i].name });
    }

    dataToReturn["comics"] = temp;

    /*
    data.data.results[0].comics.items.foreach((element) => {
      temp.push(element.name);
    });
    dataToReturn["comics"] = temp;
    */
    return dataToReturn;
  },
};

module.exports = exportedMethods;
