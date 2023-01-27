const fs = require('fs');
const path = require('path');
//const https = require('https')
const express = require('express');
//const compression = require('compression');

const app = express();
const dotenv=require('dotenv');
dotenv.config();
const sequelize = require('./util/database')
const cors = require('cors');

const User = require("./Model/user_data");
const Group = require('./Model/Group')
const groupUser = require('./Model/group_user')
const Forgotpassword = require('./Model/forgot_password')
const groupMessage = require('./Model/group_chat')



const bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: false}));

app.use(cors({
    origin:'http://127.0.0.1:5500'
}));

const loginRoutes = require('./Routes/login')
const forgotpasswordRoutes = require('./Routes/forgotpassword')
const messageRoutes = require('./Routes/Personalchat')
const GroupsRoutes = require('./Routes/Groups')
const FriendssRoutes = require('./Routes/Friends')
const adminRoutes = require('./Routes/admin')


 app.use(express.static(path.join(__dirname, 'Frontend')));

app.use(loginRoutes);
app.use(forgotpasswordRoutes);
app.use(messageRoutes)
app.use(GroupsRoutes)
app.use(FriendssRoutes)
app.use(adminRoutes)

app.use((req,res,next)=>{
  console.log(req.url);
 
    res.sendFile(path.join(__dirname,'/Frontend/Html/404.html'))

})

User.hasMany(Forgotpassword, {
    onDelete: "CASCADE",
  });
  Forgotpassword.belongsTo(User);

 
Group.belongsToMany(User, {
    onDelete: "CASCADE",
    through: "groupUser",
  });

  Group.hasMany(groupMessage, {
    onDelete: "CASCADE",
  });

  groupMessage.belongsTo(Group);
User.hasMany(groupMessage, {
  onDelete: "CASCADE",
});
groupMessage.belongsTo(User);
sequelize.sync().then((result)=>{
    //console.log(result)
     app.listen(3000);
 })
 .catch((err)=>console.log(err));