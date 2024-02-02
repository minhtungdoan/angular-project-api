const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const searchController = require("../controllers/searchController");

router.get("/search", searchController.searchUser);
router.get("/autocomplete", searchController.autocompleteUser);
router.get("/:id", userController.getUserDetail);
router.get("/", userController.getAllUsers);
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

module.exports = router;
