const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/:id", userController.getUserDetail);
router.get("/", userController.getAllUsers);
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

module.exports = router;
