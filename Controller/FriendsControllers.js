const path = require('path');
const Message = require("../Model/group_chat");
const User = require('../Model/user_data')
const Group = require('../Model/Group')

exports.listfriends= async(req,res,next)=>{
    try{
        
       User.findAll().then((response)=>{
          res.status(200).json({friends:response, user:req.user.name,url:req.user.url})
       }).catch((err)=>{
        console.log(err)
    })
       
    }
    catch(err){
        res.status(405).json(err)
    }
}