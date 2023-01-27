var modal = document.getElementById("myModal"); 
var btn = document.getElementById("myBtn");

var link ;

var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function forgotpassword(event){
    event.preventDefault();
    const email = document.getElementById('email_fp').value;

    
    console.log(email);
    const userEmail = {email};
     axios.post(`${backendapi}/password/forgotpassword`,userEmail).then((response)=>{
        if(response.status === 200){
         
         
          
            document.getElementById('div_reset').innerHTML = '';
            document.getElementById('div_reset').innerHTML += `<div class="group">
            <label for="user" class="label">Enter New Password</label>
            <input id="pass_fp" type="password" class="input" data-type="password" placeholder="Enter your password" required>
        </div> `
        
        document.getElementById('div_reset').innerHTML += `<button  id = 'newpassword' type="submit" class="button"  onclick = 'updatepassword()'>Reset Password</button> `
         
        link = response.data.link    

        
        
        }
      })
    
      
    .catch(err => {
        alert(err);
    })
}
    
function updatepassword(){
  console.log(link);

  let password = document.getElementById('pass_fp').value
  let pass = {password};

  axios.post(`${link}`,pass).then((res)=>{
     if(res.status ==201)
     {
      alert(res.data.message);
     }
  }).catch((err)=>{
    alert(err)
  })
  }
