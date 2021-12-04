const tvMazeRoutes = require("./tvMazeRoutes");

const constructorMethod = (app) => {
  app.use("/", tvMazeRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
