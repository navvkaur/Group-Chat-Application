require('dotenv').config();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../Model/user_data');
const Forgotpassword = require('../Model/forgot_password')

exports.forgotpassword = async (req,res)=>{
    try {
        console.log(req.body.email);
        const  email  = req.body.email;
        console.log(email);
        const user = await User.findOne({where : { email:email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

        return res.status(200).json({message: 'Link to reset password sent to your mail ', sucess: true,link :`http://localhost:3000/password/resetpassword/${id}`})
                
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}
exports.resetpassword = async (req, res) => {
    const id =  req.params.id;
    const newpassword = req.body.password;
    console.log(newpassword)
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        console.log(forgotpasswordrequest)
       if (forgotpasswordrequest.active == true) {
          
                User.findOne({where: { id : forgotpasswordrequest.userId}}).then(user => {
                    if(user) {                   
                        const saltRounds = 10;
    
                             bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                            
                                if(err){
                                    console.log(err);
                                    throw new Error(err);
                                }
                               
                                user.update({ password: hash }).then(() => {
                               
                                     return res.status(201).json({message: 'Successfuly update the new password'})
                                })
                            });
                        }
                        
                 else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
                forgotpasswordrequest.update({ isActive: false })
                })
        }
        else
        {
            return res.status(405).json({ error: 'Link Expired try again!', success: false})
        }
    }).catch((err)=>{
        console.error(err)
        return res.json({ message: err, sucess: false });
})
}

