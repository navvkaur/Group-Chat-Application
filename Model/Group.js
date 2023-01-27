 
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Group =  sequelize.define("group", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   
    group_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  

    creator: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });


module.exports = Group;