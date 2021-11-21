const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {
  // 1
  const mamoun = await restaurants.create(
    "Mamoun's",
    "Hoboken",
    "123-123-1234",
    "http://www.mamouns.com",
    "$$",
    ["Middle Eastern"],
    5,
    { dineIn: true, takeOut: true, delivery: true }
  );

  // console.log(await restaurants.get(mamoun._id));

  // 3
  const dhaval = await restaurants.create(
    "Dhaval's Kitchen",
    "Jersey City",
    "862-372-2219",
    "http://www.linkedin.com/in/dhaval-sikligar.com",
    "$$$$",
    ["Indian", "Mexican", "Mediterranean"],
    5,
    { dineIn: true, takeOut: false, delivery: false }
  );

  // 4
  console.log(await restaurants.getAll());

  /*

  // 5
  const bala = await restaurants.create(
    "Bala Ka Dhaaba",
    "Mumbai City",
    "551-655-5832",
    "http://www.vishalramandhaba.com",
    "$",
    ["South-Indian", "Italian"],
    5,
    { dineIn: false, takeOut: true, delivery: true }
  );

  // 6
  console.log(await restaurants.get(bala._id));

  // 7
  const updatedRestaurant = await restaurants.rename(
    mamoun._id,
    "http://www.yelp.com/biz/mamouns-falafel-new-york-2.com"
  );

  // 8
  console.log(await restaurants.get(mamoun._id));

  // 9
  const removeDhaval = await restaurants.remove(dhaval._id);

  // 10
  console.log(await restaurants.getAll());

  // 11
  try {
    const lokesh = await restaurants.create(
      "Lokesh Bros Pizza",
      "NYC",
      "12312",
      "http://lokeshbros.com",
      "$$$",
      ["Middle Eastern"],
      3,
      { dineIn: true, takeOut: true, delivery: false }
    );
  } catch (e) {
    console.log(e);
  }

  // 12
  try {
    const removeDhaval = await restaurants.remove(dhaval._id);
  } catch (e) {
    console.log(e);
  }

  // 13
  try {
    const updatedRestaurant = await restaurants.rename(
      dhaval._id,
      "http://www.yelp.com/biz/mamouns-falafel-new-york-2.com"
    );
  } catch (e) {
    console.log(e);
  }

  // 14
  try {
    const updatedRestaurant = await restaurants.rename(dhaval._id, 123);
  } catch (e) {
    console.log(e);
  }

  // 15
  try {
    console.log(await restaurants.get(dhaval._id));
  } catch (e) {
    console.log(e);
  }

  */

  const db = await connection();
  db.serverConfig.close();
};

main().catch((error) => {
  console.log(error);
});
