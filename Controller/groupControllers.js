const path = require('path');
const Message = require("../Model/group_chat");

const Group = require('../Model/Group');
const GroupUser = require('../Model/group_user');
const User = require('../Model/user_data')

exports.addgroup = async (req,res,next)=>{
    const group_name = req.body.data.name;
    
    let users = [];
    users = req.body.data.users;
    var creator = req.user.id;
   
    try{
      
        
     var group = await   Group.create({
            creator:creator,
            group_name:group_name
            
        }) 
       
        try {
           
           users.push(Number(creator))
            for (const user of users) {
              let isAdmin = req.user.id === user ? true : false;

              await GroupUser.create({
                groupId: group.id,
                userId: user,
                admin : isAdmin
                
              });
            }
            
  
            let groupList = await GroupUser.findAll({
              where: { groupId: group.id },
            });

            res.status(201).json({ status: "success", data: [groupList] });
          } catch (err) {
            console.log(err);
            res.status(500).json({ status: "error", message: "Server Error" });
          }
        } catch (err) {
            console.log(err);
          res.status(500).json({ status: "error", message: "Server Error" });
        }
    }

exports.listgroups= async(req,res,next)=>{
    try{
        
       GroupUser.findAll().then((response)=>{
          res.status(200).json({friends:response, user:req.user.name,url:req.user.url})
       }).catch((err)=>{
        res.status(405).json(err)
    })
       
    }
    catch(err){
        res.status(405).json(err)
    }
}

exports.getgroup = async (req, res, next) => {

  
        try {
          let group = await GroupUser.findAll({
            include: {
              all: true,
            },
            where: {
              userId: req.user.id,
            },
          });
  
          let responseGroup = [];
          for (const data of group) {
            let id = data.dataValues.groupId;
  
            let group = await Group.findOne({ where: { id: id } });
  
            let obj = {};
            obj["group"] = group;
            obj["isAdmin"] = data.admin;
            console.log(obj)
            responseGroup.push(obj);
          }
  
          res
            .status(200)
            .json({ status: "success", data: { groups: responseGroup } });
        } catch (err) {
          console.log(err);
          res.status(500).json({ status: "error", message: "Server Error" });
        }
      }
     
    
  
 exports.getgroupmembers = async (req,res,next)=>{
 let groupid = req.body.gp;
 try{
  let group = await GroupUser.findAll({
    include: {
      all: true,
    },
    where: {
      groupId: groupid,
    },
  });
  let detail = [];
  for (const data of group) {
    
          let id = data.userId;
         
          let user =  await  User.findAll({ where: { id: data.userId} });
      
      detail.push(user)
      
      }
    
      return res.status(201).json({ status: "success",User:detail});  
      }
      catch(err){
        console.log(err)
      }
   
  }
  


exports.sendgroupmessage = async (req,res,next)=>{
  let text = req.body.text;
  console.log(req.body);
  let groupid = req.body.gp;
  let name = req.user.name;
  let userid = req.user.id;
  try
{
  Message.create({
    name:name,
    message:text,
    userId:userid,
    groupId:groupid
   
})
    res.status(200).json({message:'message sent'})
}    
  
  catch(err){
      res.status(400).json(err);
  }
  
}

exports.getgroupmessage = async (req,res,next)=>{
  let groupid = req.body.gp;
  
  try
  {
  await Message.findAll({ where: { groupId : groupid} }).then((message)=>{
          
    res.status(200).json({message:message})  
}).catch((err)=>{
  console.log(err)
})
      
      }
      catch(err){
        console.log(err)
        res.status(400).json({error:err})
      }

}