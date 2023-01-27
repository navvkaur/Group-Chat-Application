const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Message =  sequelize.define("personal_message", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fromUser:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
    },
    toUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });


module.exports = Message;