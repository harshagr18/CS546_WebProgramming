const { restaurants } = require("./../config/mongoCollections");
const { ObjectId } = require("mongodb");
const restaurantsData = require("./restaurants");

function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `One of the elements is not a number`;
  }

  if (isNaN(val)) {
    throw `One of the elements is NaN`;
  }
}

function validateDate(date) {
  var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return date_regex.test(date);
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

const exportedMethods = {
  async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
    if (
      !restaurantId ||
      !title ||
      !reviewer ||
      !rating ||
      !dateOfReview ||
      !review
    ) {
      throw `Missing Parameter`;
    }

    checkIsProperString(restaurantId);
    checkIsProperString(title);
    checkIsProperString(reviewer);
    checkIsProperString(dateOfReview);
    checkIsProperString(review);

    if (!ObjectId.isValid(restaurantId)) {
      throw `Invalid ID passed`;
    }

    checkIsProperNumber(rating);

    if (rating < 1 || rating > 5) {
      throw "Invalid Rating";
    }

    if (!validateDate(dateOfReview)) {
      throw "Invalid date";
    }

    const date = new Date();

    if (
      dateOfReview !=
      date
        .toLocaleString("en-US", { timeZone: "America/New_York" })
        .slice(0, 10)
    ) {
      throw "Please enter today's date";
    }

    /*
    if (
      dateOfReview.slice[(6, 10)] <
      date.toLocaleString("en-US", { timeZone: "UTC" }).slice(6, 10)
    ) {
      throw "Date in past";
    } else {
      if (
        dateOfReview.slice[(0, 2)] <
        date.toLocaleString("en-US", { timeZone: "UTC" }).slice(6, 10)
      ) {
      }
    }
*/
    let newReview = {
      _id: new ObjectId(),
      title: title,
      reviewer: reviewer,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review,
    };
    const restaurantCollection = await restaurants();
    const insertInfo = await restaurantCollection.updateOne(
      { _id: new ObjectId(restaurantId) },
      { $push: { reviews: newReview } }
    );

    restaurantsData.calRating(restaurantId);

    if (insertInfo.insertedCount === 0) throw `Could not add review`;
    return restaurantsData.get(new ObjectId(restaurantId));
  },

  async getAll(restaurantId) {
    if (!restaurantId) throw "No restaurant ID provided";

    checkIsProperString(restaurantId);

    if (!ObjectId.isValid(restaurantId)) {
      throw `Invalid ID passed`;
    }

    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({
      _id: new ObjectId(restaurantId),
    });

    return await restaurant.reviews;
  },

  async get(reviewId) {
    if (!reviewId) throw "No review ID provided";
    checkIsProperString(reviewId);

    if (!ObjectId.isValid(reviewId)) {
      throw `Invalid ID passed`;
    }

    const restaurantCollection = await restaurants();

    let restaurant = await restaurantCollection.findOne({
      "reviews._id": new ObjectId(reviewId),
    });
    if (!restaurant) throw "restaurant not found";

    let final = {};
    restaurant.reviews.forEach((element) => {
      if (String(element._id) == reviewId) {
        element._id = "" + element._id;
        final = element;
      }
    });
    return final;
  },

  async remove(reviewId) {
    if (reviewId === undefined) throw "No id provided";
    if (!reviewId) throw "No reviewId provided";

    if (!ObjectId.isValid(reviewId)) {
      throw `Invalid ID passed`;
    }

    const restaurantCollection = await restaurants();

    const returnRestaurant = await restaurantCollection.findOne({
      "reviews._id": new ObjectId(reviewId),
    });

    const restuarant = await restaurantCollection.updateOne(
      { "reviews._id": new ObjectId(reviewId) },
      { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
    );

    if (restuarant.modifiedCount === 0) {
      throw "could not delete restaurant successfully";
    } else {
      let a = await restaurantsData.calRating(returnRestaurant._id.toString());
      return { reviewId: reviewId, deleted: true };
    }
  },
};

module.exports = exportedMethods;
