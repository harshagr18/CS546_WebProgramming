const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

/*
router.get("/", async (req, res) => {
  try {
    let restaurantsList = await restaurantsData.getAll();
    if (restaurantsList.length == 0) {
      res.status(404).json({ error: "There are no restaurants in database" });
      return;
    }
    res.json(restaurantsList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  let restaurantInfo = req.body;

  if (!restaurantInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (
    !restaurantInfo.name ||
    !restaurantInfo.location ||
    !restaurantInfo.phoneNumber ||
    !restaurantInfo.website ||
    !restaurantInfo.priceRange ||
    !restaurantInfo.cuisines ||
    !restaurantInfo.serviceOptions
  ) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  try {
    const newRestaurant = await restaurantsData.create(
      restaurantInfo.name,
      restaurantInfo.location,
      restaurantInfo.phoneNumber,
      restaurantInfo.website,
      restaurantInfo.priceRange,
      restaurantInfo.cuisines,
      restaurantInfo.serviceOptions
    );
    res.json(newRestaurant);
  } catch (e) {
    res.status(400).json({ error: "Improper data" });
  }
});

router.put("/:id", async (req, res) => {
  let restaurantInfo = req.body;

  if (!restaurantInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (
    !restaurantInfo.name ||
    !restaurantInfo.location ||
    !restaurantInfo.phoneNumber ||
    !restaurantInfo.website ||
    !restaurantInfo.priceRange ||
    !restaurantInfo.cuisines ||
    !restaurantInfo.serviceOptions
  ) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  try {
    await restaurantsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Resaurant not found" });
    return;
  }
  try {
    const updatedRestaurant = await restaurantsData.update(
      req.params.id,
      restaurantInfo.name,
      restaurantInfo.location,
      restaurantInfo.phoneNumber,
      restaurantInfo.website,
      restaurantInfo.priceRange,
      restaurantInfo.cuisines,
      restaurantInfo.serviceOptions
    );
    res.json(updatedRestaurant);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) throw "You must specify an ID to delete";
  try {
    await restaurantsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }

  try {
    deletedRestaurant = await restaurantsData.remove(req.params.id);
    res.json(deletedRestaurant);
    return;
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

*/
module.exports = router;
