const User = require("../models/userModel");

class SearchController {
  async search(req, res) {
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
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async autocomplete(req, res) {
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
}

module.exports = new SearchController();
