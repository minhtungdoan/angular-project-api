const Laptop = require("../models/laptopModel");
const { validateLaptop } = require("../validations");

class laptopController {
  async getAllLaptops(req, res) {
    try {
      const laptops = await Laptop.find().populate("category");
      res.json(laptops);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getLaptopDetail(req, res) {
    try {
      const laptop = await Laptop.findById(req.params.id).populate("category");
      res.json(laptop);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createLaptop(req, res) {
    try {
      const { error } = validateLaptop.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      await Laptop.create(req.body);
      res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateLaptop(req, res) {
    try {
      await Laptop.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteLaptop(req, res) {
    try {
      await Laptop.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async filterByCategories(req, res) {
    try {
      const laptops = await Laptop.find({
        category: { $in: req.query.query.split(",") },
      }).populate("category");
      res.json(laptops);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new laptopController();
