// code base
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();
const { secretCode } = process.env;
const checkPermission = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Ban chua dang nhap" });
  }

  const decoded = jwt.verify(token, secretCode);
  if (!decoded) {
    throw new Error("Token error");
  }

  const user = User.findById(decoded._id);
  if (!user) {
    return res
      .status(400)
      .json({ message: "User khong ton tai trong he thong" });
  }

  next();
};

module.exports = { checkPermission };
