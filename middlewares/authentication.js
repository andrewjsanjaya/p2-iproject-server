const { checkToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = checkToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Invalid Token" };
    } else {
      req.user = {
        id: user.id,
        username: user.username,
        city: user.city,
        email: user.email,
        status: user.status,
      };
    }

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authentication;
