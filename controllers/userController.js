const { User } = require("../models");
const { sendVerificationCode } = require("../helpers/verificationCode");

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
}

module.exports = Controller;
