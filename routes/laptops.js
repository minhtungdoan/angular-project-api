const express = require("express");
const router = express.Router();

const laptopController = require("../controllers/laptopController");
const searchController = require("../controllers/searchController");
const { checkPermission } = require("../middlewares");

router.get("/search", searchController.searchLaptop);
router.get("/filterByCategories", laptopController.filterByCategories);
router.get("/:id", laptopController.getLaptopDetail);
router.get("/", laptopController.getAllLaptops);
router.post("/", laptopController.createLaptop);
router.put("/:id", laptopController.updateLaptop);
router.delete("/:id", laptopController.deleteLaptop);
// router.post("/", checkPermission, laptopController.createLaptop);
// router.put("/:id", checkPermission, laptopController.updateLaptop);
// router.delete("/:id", checkPermission, laptopController.deleteLaptop);

module.exports = router;
