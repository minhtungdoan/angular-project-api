// code base

const laptops = require("./laptops");
const users = require("./users");
const categories = require("./categories");

function routes(app) {
  app.use("/laptops", laptops);
  app.use("/categories", categories);
  app.use("/auth", users);
}

module.exports = routes;
