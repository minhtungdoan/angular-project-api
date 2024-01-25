const Category = require("../models/categoryModel");
const { validateCategory } = require("../validations");

class categoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.json(category);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const { error } = validateCategory.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      await Category.create(req.body);
      res.json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      await Category.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      await Category.deleteOne({ _id: req.params.id });
      res.json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new categoryController();
