// code base

const laptops = require("./laptops");
const users = require("./users");
const categories = require("./categories");
const search = require("./search");
const autocomplete = require("./autocomplete");

function routes(app) {
  app.use("/laptops", laptops);
  app.use("/categories", categories);
  app.use("/auth", users);
  app.use("/search", search);
  app.use("/autocomplete", autocomplete);
}

module.exports = routes;
