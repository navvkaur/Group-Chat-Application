const path = require('path');
const Message = require("../Model/group_chat");
const { Op } = require("sequelize");

const Group = require('../Model/Group');
const GroupUser = require('../Model/group_user');
const User = require('../Model/user_data')

exports.groupFriends = async (req, res, next) => {
  id = req.query.id;
  console.log(id)
        let userId = req.user.id;

        try {
          let group = await GroupUser.findAll({
            where: { groupId: id },
          });
          // Lets create friends and none friends list
          let friends = [];
          let notFriends = [];
          let friendsId = [];
          if (group.length > 0) {
            for (const dt of group) {
             
              let groupUser = dt.dataValues.userId;
  
              if (Number(groupUser) != Number(userId)) {
                try {
                  let user = await User.findOne({
                    where: { id: groupUser },
                    attributes: ["id", "name"],
                  });
  
                  obj = {};
                  obj["user"] = user;
                  obj["isAdmin"] = dt.dataValues.admin;
                  friends.push(obj);
                  friendsId.push(user.id);
                } catch (err) {
                  console.log(err)
                  res
                    .status(500)
                    .json({ status: "error", message: "Internal server error" });
                }
              }
            }
          }
  
          try {
            notFriends = await User.findAll({
              where: {
                id: {
                  [Op.and]: {
                    [Op.notIn]: friendsId,
                    [Op.not]: userId,
                  },
                },
              },
              attributes: ["id", "name"],
            });
          } catch (err) {
            console.log(err)
            res
              .status(500)
              .json({ status: "error", message: "Internal server error" });
          }
          res.status(200).json({
            status: "success",
            data: { friends: friends, notFriends: notFriends },
          });
        } catch (err) {
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        }
    
  };
  

  exports.adminModify = async(req, res, next) => {
    let groupId = req.body.data.groupId
    let userId = req.body.data.userId
    try{
      let user = await GroupUser.findOne({
        where: {
          userId: userId,
          groupId: groupId,
        },
    })
    if (user) {
      user.admin = !user.admin;

      await user.save();
    }

    res.status(201).json({ status: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
  }

  exports.addGroupUser= async(req,res,next)=>{
    let groupId = req.body.data.groupId
   let userId = req.body.data.userId
   
   try {
    let groupUser = await GroupUser.create({
      groupId: groupId,
      userId: userId,
      admin: false,
    });

    res.status(201).json({ status: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
  }

  exports.removeGroupUser = async(req, res, next) => {
    let groupId = req.body.groupId
    let userId = req.body.userId
    try {
      let groupUser = await GroupUser.destroy({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });

      res.status(201).json({ status: "success" });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }