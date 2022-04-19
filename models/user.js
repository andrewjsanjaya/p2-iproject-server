"use strict";
const { Model } = require("sequelize");
const { createPassword } = require("../helpers/bcrypt");
const nodemailer = require("nodemailer");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Playlist);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: "email already used" },
        allowNull: false,
        validate: {
          notEmpty: { msg: "email is required" },
          notNull: { msg: "email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password is required" },
          notNull: { msg: "password is required" },
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        unique: { msg: "username already used" },
        allowNull: false,
        validate: {
          notEmpty: { msg: "username is required" },
          notNull: { msg: "username is required" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "city location is required" },
          notNull: { msg: "city location is required" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = createPassword(instance.password);
          instance.status = "unverified";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
