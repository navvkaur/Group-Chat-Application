require('dotenv').config();

const User = require("../Model/user_data");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

function generateAccessToken(id,name,phn,url){
    return jwt.sign({userId:id,name:name,phn:phn,url:url},process.env.SECRET_KEY);
}

exports.signin = async (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phn = req.body.phn;
    const password = req.body.password;
try{
    const saltrounds= 10;
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
        User.findAll({where:{email}}).then((user)=>{
            console.log("length "+ user.length);
            if(user.length > 0){
                return res.status(205).json({message:'User Already Exists! Try Login'})
            }
           if(user.length == 0)
      {  User.create({
              name:name,
              email:email,
              phn : phn,
              password:hash
          })
          return res.status(201).json({ message:'Account Successfully Created! Lets create your profile!'})
         
      }
        })
        
    })
}catch (err) {
    console.log(err);
    res.status(405).json({ error: err,message:'User Already Exists Try Login!' });
}
}

exports.login = async(req,res,next)=>{
    
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({where:{email}})
    .then(user=>{
        if(user.length >0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result===true){
                   return res.status(200).json({ success:true, message: "Login Successfully",token:generateAccessToken(user[0].id,user[0].name,user[0].phn,user[0].url)});
                }
                if(err)
                {
                    throw new Error("Something went wrong");
                }
                else
                {
                    return res.status(202).json({success:false, message: "Incorrect Password! Try Again or Reset your password!"});
                }
            })          
        }
        else{
           return  res.status(205).json({ success:false,message: "User does not exist! Signup first"});
    }
    
    })
.catch((err)=> {
    console.log(err);
    res.status(500).json({ error: err ,success:false});
});
}
// function getUsers(){
//      User.findAll({where:{email}})
//     .then(user=>{
//         res.status(200).json(user)

// }).catch(err=>{
//   res.status(400).json(err)
// })
// }


exports.editprofile=async (req,res,next)=>{
  try{ const name = req.body.name
    let gender = req.body.gender
    let url = req.body.url
  let user = await User.update({
    gender : gender,
    url : url
  },{where:{name:name}})
   return res.status(200).json({success:true})
  }
 catch(err){
    res.status(400).json(err)
  }
       
   
}