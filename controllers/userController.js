const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypjt = require("bcryptjs");
const dotenv = require("dotenv");
const { validateRegister, validateLogin } = require("../validations/index");

dotenv.config();
const { secretCode } = process.env;

class userController {
  async userRegister(req, res) {
    try {
      const { fullname, age, email, password } = req.body;

      const { error } = validateRegister.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "Email da ton tai trong he thong" });
      }

      const hashPassword = await bcrypjt.hash(password, 10);

      await User.create({
        fullname,
        age,
        email,
        password: hashPassword,
      });

      res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const { error } = validateLogin.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email or password sai" });
      }

      const isMatch = await bcrypjt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email or password sai" });
      }

      const token = jwt.sign({ _id: user._id }, secretCode, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login successfully!!!",
        token,
        user: {
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new userController();
