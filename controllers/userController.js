const { User } = require("../models");
const {
  sendVerificationCode,
  generateVerificationCode,
} = require("../helpers/verificationCode");
const { readPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, username, password, city } = req.body;
      const dataUser = { email, username, password, city };

      const user = await User.create(dataUser);

      sendVerificationCode(user.username, user.email, user.id);

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        city: user.city,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      let user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        user = await User.findOne({
          where: {
            email: username,
          },
        });

        if (!user) {
          throw { name: "401" };
        }
      }

      const checkPassword = readPassword(password, user.password);

      if (!checkPassword) {
        throw { name: "401" };
      }

      const accessToken = createToken({ id: user.id });

      res.status(200).json({
        id: user.id,
        access_token: accessToken,
        username: user.username,
        email: user.email,
        city: user.city,
        status: user.status,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getVerificationCode(req, res, next) {
    try {
      const { username, email, id } = req.user;

      sendVerificationCode(username, email, id);

      res.status(200).json({
        message: "email has been sent",
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyCode(req, res, next) {
    try {
      const { verificationCode } = req.body;
      const { username, email, id } = req.user;

      const code = generateVerificationCode(username, id);

      console.log(code, verificationCode, "<<<<<<<<<<");

      if (code !== verificationCode) {
        throw { name: "Wrong Verification Code" };
      }

      await User.update({ status: "verified" }, { where: { id: req.user.id } });

      res.status(201).json({
        message: "Success verify your account",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
