const User = require("../Model/user_data");

const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next)=>{
    try{
    
    const token = req.header('Authorization');
   
    const user = jwt.verify(token,process.env.SECRET_KEY);
    await User.findByPk(user.userId).then(user=>{

        req.user=user;
        next();

    }).catch(err=>{throw new Error(err)})
}catch(err){
    console.log(err);
    return res.status(401).json({success:false})
}
}