const dotnev = require('dotenv').config();
const path = require('path');
const { Op } = require("sequelize");
const Message = require("../Model/message");
const User = require('../Model/user_data')

exports.sendmessage =async (req,res,next)=>{
   
    let {text} = req.body;
    let id = req.body.messageid;
    console.log(id)
    let name = req.user.id;
    
    

    Message.create({
      fromUser:req.user.id,
        message:text,
        toUser:id,
        
       
    }).then((detail)=>{
        res.status(200).json({message:'message sent',detail:detail})
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err);
    })
    

}


exports.getmessage=async (req,res,next)=>{
    try{
        let id = Number(req.body.messageid); 
        console.log(id);
        let message = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                      [Op.and]: [
                        {
                          fromUser: Number(req.user.id),
                        },
                        {
                          toUser: id,
                        },
                      ],
                    },
                    {
                      [Op.and]: [
                        {
                          fromUser:id,
                        },
                        {
                          toUser: Number(req.user.id),
                        },
                      ],
                    },
                  ],
                },
            });
  console.log('--------------------')

  
          res.status(201).json({
            status: "success",
            message: message ,
            user:req.user

          }
          );
    }
    
    catch(err) {
        res.status(400).json(err);
    }
}

exports.getpic = async (req,res,next)=>{
    let id = req.body.id;
   
    User.findAll({where:{id}}).then((user)=>{
       
        
        res.status(200).json({user})
    }).catch(err=>{
        res.status(400).json(err);
        console.log(err)
    })
}
