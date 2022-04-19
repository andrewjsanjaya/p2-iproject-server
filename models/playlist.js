"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User);
    }
  }
  Playlist.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "title is required" },
          notNull: { msg: "title is required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "image is required" },
          notNull: { msg: "image is required" },
        },
      },
      spotifyUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "spotify link is required" },
          notNull: { msg: "spotify link is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "user is required" },
          notNull: { msg: "user is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
