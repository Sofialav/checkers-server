const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Channel = db.define(
  "channel",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);
Channel.belongsTo(User);
module.exports = Channel;
