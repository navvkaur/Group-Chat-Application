
var backendapi = 'http://127.0.0.1:3000';
const token = localStorage.getItem('token');
const messageid = localStorage.getItem('message')
window.addEventListener('DOMContentLoaded', (event) => {
    getmessage();

})


async function sendmessage()
{
    
  let text = document.getElementById('text').value;
    console.log(text);
    let message = {
        text,messageid
    }
axios.post(`${backendapi}/sendmessage`,message,{headers:{"Authorization":token}}).then((response)=>{
        console.log(response.data.detail);
        location.reload();
    }).catch((err)=>{
     console.log(err)
    })
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function getmessage(){

  let message = {
    messageid
}
    axios.post(`${backendapi}/getmessage`,message,{headers:{"Authorization":token}}).then((response)=>{
  
       
        console.log(response.data)
        
        response.data.message.forEach(element => {
         console.log(element)
          displaymessage(element)
      });
       
    }).catch((err)=>{
     console.log(err)
    })
}

async function displaymessage(msg)
{   
      let decodetoken = parseJwt(token) 
      console.log(decodetoken)
      let from = msg.fromUser;
      let to = msg.toUser;     //hii navneet 
      let message = msg.message;
      console.log(decodetoken.userId == from)
     if(decodetoken.userId == from){
      let id = msg.fromUser
      let nm = {id}
      await axios.post(`${backendapi}/pictures`,nm).then((response)=>{
        document.getElementById('message').innerHTML += `<li class="d-flex justify-content-between mb-4">
        <div class="card mask-custom w-100">
          <div class="card-header d-flex justify-content-between p-3"
            style="border-bottom: 1px solid rgba(255,255,255,.3);">
            <p class="fw-bold mb-0">${response.data.user[0].name}</p>
<p class="text-light small mb-0"><i class="far fa-clock"></i>${msg.createdAt.slice(11,16)}</p>
          </div><div class="card-body"><p class="mb-0">${msg.message}</p>
        </div></div><img src=${response.data.user[0].url} alt="avatar" 
        class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
      </li>`
      })
     }

    if(decodetoken.userId ==to)
        {
          console.log(msg.toUser)
          let id = msg.fromUser
          let nm = {id}
          await axios.post(`${backendapi}/pictures`,nm).then((response)=>{
            
            document.getElementById('message').innerHTML += `<li class="d-flex ">
            <img src=${response.data.user[0].url} alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
            <div class="card mask-custom">
            <div class="card-header d-flex justify-content-between p-3 w-70 "
            style="border-bottom: 1px solid rgba(255,255,255,.3);">
                <p class="fw-bold mb-0">${response.data.user[0].name}</p>
                <p class="text-light small mb-0"><i class="far fa-clock"></i>${msg.createdAt.slice(11,16)}</p>
              </div>
              <div class="card-body">
                <p class="mb-0">${msg.message}</p>
              </div>
            </div>
           </li>`   
          })
        }
  
     
     
 
  }

