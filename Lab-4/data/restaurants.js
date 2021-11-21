const { restaurants } = require("./../config/mongoCollections");

const { ObjectId } = require("mongodb");

function checkIsProperArray(val) {
  if (!val) {
    throw `No input given.`;
  }
  if (val.length == 0) {
    throw `Empty array given.`;
  }
  if (!Array.isArray(val)) {
    throw `Input is not array.`;
  }
}

function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    console.log(val);
    throw `Not a string`;
  }

  if (val.length == 0) {
    throw `Length of string is 0`;
  }
  if (val.trim().length == 0) {
    throw `String is only spaces`;
  }
}

function checkIsProperObject(val) {
  if (typeof val !== "object" || Array.isArray(val) || val === null) {
    throw `Element was not an object`;
  }
}

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async get(id) {
    if (!id) throw "You must provide an id to search for";
    if (!ObjectId.isValid(id)) {
      throw `Invalid ID passed`;
    }

    const restaurantCollection = await restaurants();

    const restaurant = await restaurantCollection.findOne({
      _id: new ObjectId(id),
    });
    if (restaurant === null) throw "No restaurant with that id";

    return restaurant;
  },

  async getAll() {
    if (arguments.length != 0) {
      throw `Unnecessary argument passed`;
    }
    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}).toArray();

    restaurantList.forEach((element) => (element._id = "" + element._id));

    return await restaurantList;
  },

  async create(
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions
  ) {
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !overallRating ||
      !serviceOptions
    ) {
      throw `Missing Parameter`;
    }

    checkIsProperString(name);
    checkIsProperString(location);
    checkIsProperString(phoneNumber);
    checkIsProperString(website);
    checkIsProperString(priceRange);

    let phoneno = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

    if (
      !(
        typeof overallRating == "number" &&
        overallRating >= 0 &&
        overallRating <= 5
      )
    ) {
      throw `invalid overall rating`;
    }

    if (!phoneNumber.match(phoneno)) {
      throw `Phone number is of improper format`;
    }

    if (
      !(
        website.slice(0, 11).toLowerCase() == "http://www." &&
        website.slice(website.length - 4, website.length + 1).toLowerCase() ==
          ".com" &&
        website.length >= 20
      )
    ) {
      throw `Invalid website`;
    }

    if (
      !(
        priceRange === "$" ||
        priceRange === "$$" ||
        priceRange === "$$$" ||
        priceRange === "$$$$"
      )
    ) {
      throw `Invalid price range`;
    }

    checkIsProperArray(cuisines);

    for (let i = 0; i < cuisines.length; i++) {
      checkIsProperString(cuisines[i]);
    }

    checkIsProperObject(serviceOptions);

    if (
      !(
        (serviceOptions.dineIn === true || serviceOptions.dineIn === false) &&
        (serviceOptions.takeOut === true || serviceOptions.takeOut === false) &&
        (serviceOptions.delivery === true || serviceOptions.delivery === false)
      )
    ) {
      throw `service options error`;
    }

    let newRestaurant = {
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      website: website,
      priceRange: priceRange,
      cuisines: cuisines,
      overallRating: overallRating,
      serviceOptions: serviceOptions,
    };
    const restaurantCollection = await restaurants();
    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw `Could not add restaurant`;
    const newId = insertInfo.insertedId;

    const restaurant = await this.get(newId);
    return restaurant;
  },

  async remove(id) {
    if (!id) throw "You must provide an id to search for";
    if (!ObjectId.isValid(id)) {
      throw `Invalid ID passed`;
    }

    const restaurantCollection = await restaurants();
    const deletionInfo = await restaurantCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete restaurant with id of ${id}`;
    }
    return { deleted: true };
  },

  async rename(id, newWebsite) {
    if (!id) throw "You must provide an id to search for";
    if (!ObjectId.isValid(id)) {
      throw `Invalid ID passed`;
    }
    checkIsProperString(newWebsite);

    if (
      !(
        newWebsite.slice(0, 11) == "http://www." &&
        newWebsite.slice(newWebsite.length - 4, newWebsite.length + 1) ==
          ".com" &&
        newWebsite.length >= 20
      )
    ) {
      throw `Invalid website`;
    }

    const restaurantCollection = await restaurants();
    const updatedrestaurant = {
      website: newWebsite,
    };

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedrestaurant }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update restaurant successfully";
    }

    return await this.get(id);
  },
};
