const marvelRoutes = require("./marvel");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", marvelRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Invalid method" });
  });
};

module.exports = constructorMethod;
