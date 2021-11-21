const { users } = require("./../config/mongoCollections");
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

let exportedMethods = {
  async createUser(username, password) {
    if (!username) throw "You must provide a username";
    if (!password) throw `You must provide a password`;

    const usersCollection = await users();

    const restaurant = await restaurantCollection.findOne({
      _id: new ObjectId(id),
    });
    if (restaurant === null) throw "No restaurant with that id";

    return restaurant;
  },
  /*
  async calRating(restaurantId) {
    let avg = 0;
    let restaurant = await this.get(restaurantId);
    const restaurantCollection = await restaurants();

    restaurant.reviews.forEach((element) => {
      avg += element.rating;
    });

    if (restaurant.reviews.length != 0) {
      avg = avg / restaurant.reviews.length;
      avg = Math.round(avg * 100) / 100;
    }
    restaurant.overallRating = avg;
    await restaurantCollection.updateOne(
      { _id: new ObjectId(restaurantId) },
      { $set: restaurant }
    );
  },

  async getAll() {
    if (arguments.length != 0) {
      throw `Unnecessary argument passed`;
    }
    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}).toArray();

    restaurantList.forEach((element) => (element._id = "" + element._id));

    restaurantList.forEach((element) => delete element.location);
    restaurantList.forEach((element) => delete element.phoneNumber);
    restaurantList.forEach((element) => delete element.website);
    restaurantList.forEach((element) => delete element.priceRange);
    restaurantList.forEach((element) => delete element.cuisines);
    restaurantList.forEach((element) => delete element.overallRating);
    restaurantList.forEach((element) => delete element.serviceOptions);
    restaurantList.forEach((element) => delete element.reviews);

    return await restaurantList;
  },

  async create(
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    serviceOptions
  ) {
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
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
      overallRating: 0,
      serviceOptions: serviceOptions,
      reviews: [],
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
    return { restaurantId: id, deleted: true };
  },

  async update(
    id,
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    serviceOptions
  ) {
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
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

    const restaurantCollection = await restaurants();
    const updatedRestaurantData = {};

    if (name) {
      updatedRestaurantData.name = name;
    }

    if (location) {
      updatedRestaurantData.location = location;
    }

    if (phoneNumber) {
      updatedRestaurantData.phoneNumber = phoneNumber;
    }

    if (website) {
      updatedRestaurantData.website = website;
    }

    if (priceRange) {
      updatedRestaurantData.priceRange = priceRange;
    }

    if (cuisines) {
      updatedRestaurantData.cuisines = cuisines;
    }

    if (serviceOptions) {
      updatedRestaurantData.serviceOptions = serviceOptions;
    }

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedRestaurantData }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw "could not update restaurant successfully";
    }

    return await this.get(id);
  },
  */
};

module.exports = exportedMethods;
