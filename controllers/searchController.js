const User = require("../models/userModel");
const Laptop = require("../models/laptopModel");

class SearchController {
  async searchUser(req, res) {
    try {
      const result = await User.aggregate([
        {
          $search: {
            index: "user_search",
            text: {
              query: req.query.query,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        {
          $limit: 6,
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async autocompleteUser(req, res) {
    try {
      const result = await User.aggregate([
        {
          $search: {
            index: "autocomplete_search",
            autocomplete: {
              query: req.query.query,
              path: "fullName",
              fuzzy: {},
            },
            highlight: {
              path: ["fullName"],
            },
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            fullName: 1,
            highlights: {
              $meta: "searchHighlights",
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async searchLaptop(req, res) {
    try {
      const result = await Laptop.aggregate([
        {
          $search: {
            index: "laptops_search",
            text: {
              query: req.query.search,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $limit: 6,
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new SearchController();
