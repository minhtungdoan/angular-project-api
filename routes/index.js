// code base

const laptops = require("./laptops");
const users = require("./users");

function routes(app) {
  app.use("/laptops", laptops);
  app.use("/auth", users);
}

module.exports = routes;
