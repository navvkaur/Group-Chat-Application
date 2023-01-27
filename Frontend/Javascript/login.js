var backendapi = 'http://127.0.0.1:3000';
const token = localStorage.getItem('token');
function signup(event){
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('username').value;
    let phn = document.getElementById('phn').value;
    let password = document.getElementById('password').value;
    

    let detail = {
    name,email,phn,password
    };
    console.log(detail)

    postrequest= async () => {
       try{
        console.log(detail);
        
        const response = await axios.post(`${backendapi}/login/sign-in`,detail);
          
        console.log(response.data.message)
         alert(response.data.message)
         if(response.status == 201){
         window.location = "EditProfile.html";
         }
       
       
    }
    
    catch
    {err=>console.log(err)
       alert(err.message)
    }
}
postrequest();
}


function login(event){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    

    let login_detail = {
        email,password
};
getrequest= async () => {
  
     console.log(login_detail);
      await axios.post(`${backendapi}/login`,login_detail).then(response=>{
        console.log(response);
        if(response.status == 200){
           alert(response.data.message)
           localStorage.setItem('token',response.data.token)
           window.location = 'Profile.html'

          }
      else
      {
        alert(response.data.message)
      }
    }).catch(err=>{console.log(JSON.stringify(err))
        alert(err.message);
    });

}
getrequest();
}



function createProfile(event){
  event.preventDefault();
  const name = document.getElementById('profile_name').value;
  let url = document.getElementById('url').value;
  var e = document.getElementById('gender');
    var gender = e.options[e.selectedIndex].value;
    console.log(name,url,gender)
    console.log("gender====>",gender)
    if(url == ''){
      if(gender == "Female"){
         url = 'https://c8.alamy.com/comp/2G7FT9A/default-avatar-photo-placeholder-grey-profile-picture-icon-woman-in-t-shirt-2G7FT9A.jpg'
      }
      if(gender == "Male")
      {
        url = 'https://c8.alamy.com/comp/2G7FT77/default-avatar-photo-placeholder-grey-profile-picture-icon-man-in-t-shirt-2G7FT77.jpg'
      }
    }

    let details = {
      name,url,gender
    }
  console.log(details)
    axios.post(`${backendapi}/editprofile`,details,{headers:{"Authorization":token}}).then((res)=>{
      if(res.status == 200){
      alert('Profile successfully Created! Login to continue')
      window.location = 'login.html'
      }
    }).catch((err)=>{
      alert('Something went wrong!',err)
      console.log(err)
    })
}