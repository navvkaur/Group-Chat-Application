const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const GroupUser = sequelize.define("groupuser", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    groupId:{
      type: Sequelize.INTEGER,
      allowNull: false,
    }
    ,
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      default: 0,
    },
  });


module.exports = GroupUser;