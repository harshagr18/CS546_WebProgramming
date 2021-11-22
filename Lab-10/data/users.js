const { users } = require("./../config/mongoCollections");
const bcrypt = require("bcrypt");
const e = require("express");
const saltRounds = 16;

function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    throw `Not a string`;
  }
  if (val.indexOf(" ") >= 0) {
    throw `White spaces not allowed`;
  }
}

async function get(username) {
  const userCollection = await users();
  const user = await userCollection.findOne({
    username: username,
  });
  return user;
}

let exportedMethods = {
  async createUser(username, password) {
    checkIsProperString(username);
    username = username.toLowerCase();
    if ((await get(username)) != null) {
      throw `Duplicate username`;
    }
    if (username.trim().length < 4) {
      throw `Please chose a longer username`;
    }
    if (password.trim().length < 6) {
      throw `Please chose a longer password`;
    }
    checkIsProperString(password);

    const hash = await bcrypt.hash(password, saltRounds);
    let newUser = {
      username: username,
      password: hash,
    };
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw `Could not add user`;
    else {
      return { userInserted: true };
    }
  },

  async checkUser(username, password) {
    checkIsProperString(username);
    username = username.toLowerCase();
    if (username.trim().length <= 4) {
      throw `Please chose a longer username`;
    }
    if (password.trim().length <= 6) {
      throw `Please chose a longer password`;
    }
    checkIsProperString(password);
    let user = await get(username);
    if (user === null) {
      throw `Username not found`;
    }
    let compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return { authenticated: true };
    } else return compare;
  },
};

module.exports = exportedMethods;
