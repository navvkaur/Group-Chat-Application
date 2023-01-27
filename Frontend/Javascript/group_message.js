var backendapi = 'http://127.0.0.1:3000';
const token = localStorage.getItem('token');
let gp = localStorage.getItem("groupChat")

window.addEventListener('DOMContentLoaded',(event)=>{
   
    getgroupmembers();
    getgroupmessage();

})


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
async function getgroupmembers()
{    let groupid = {gp}
const decodetoken = parseJwt(token);
    await axios.post(`${backendapi}/getgroupmembers`,groupid,{headers:{"Authorization":token}}).then((response)=>{
     console.log(response.data.User)
          response.data.User.forEach(element => {
            for(let i = 0;i<element.length ;i++){
                console.log(element[i].name)
                 if(decodetoken.name != element[i].name){
                    document.getElementById('members').innerHTML += `<li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(245, 242, 242, 0.3) !important;">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src=${element[i].url} alt="avatar"
                          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
                        <div class="pt-1">
                          <p class="fw-bold mb-0">${element[i].name}</p>
                         
                        </div>
                      </div>
                      <div class="pt-1" id = 'admin'>
                     
                       
                      </div>
                    </a>
                  </li>`
                 }
               

             
            }
           
        });
    })
   

   
}

function sendmessage()
{
    let text = document.getElementById('text').value;
    console.log(text);
    let message = {
        text,gp
    }
axios.post(`${backendapi}/group/sendmessage`,message,{headers:{"Authorization":token}}).then((response)=>{
        console.log(response.data.detail);
        location.reload();
    }).catch((err)=>{
     console.log(err)
    })
}


async function getgroupmessage(){
    let groupid = {gp};

    axios.post(`${backendapi}/group/getmessage`,groupid,{headers:{"Authorization":token}}).then((response)=>{ 
        response.data.message.forEach(element => {
            displaymessage(element)
        });
       
    }).catch((err)=>{
     console.log(err)
    })
}

async function displaymessage(msg)
{    var link;
    const decodetoken = parseJwt(token);
        let id = msg.userId
        document.getElementById('pro_name').innerText = name;
        let nm = {id};
       await axios.post(`${backendapi}/pictures`,nm).then((response)=>{
        console.log(response.data.details) 
        link = response.data.user[0].url;
          
       
        }).catch((err)=>{
          console.log(err);
      })
      
    if(decodetoken.name == msg.name)
        {
          
document.getElementById('message').innerHTML += `<li class="d-flex justify-content-between mb-4">
            <div class="card mask-custom w-100">
              <div class="card-header d-flex justify-content-between p-3"
                style="border-bottom: 1px solid rgba(255,255,255,.3);">
                <p class="fw-bold mb-0">${msg.name}</p>
<p class="text-light small mb-0"><i class="far fa-clock"></i>${msg.createdAt.slice(11,16)}</p>
              </div><div class="card-body"><p class="mb-0">${msg.message}</p>
            </div></div><img src=${link} alt="avatar" 
            class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
          </li>`
        }
        
    else{
      
     
 document.getElementById('message').innerHTML += `<li class="d-flex ">
 <img src=${link} alt="avatar"
   class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
 <div class="card mask-custom">
 <div class="card-header d-flex justify-content-between p-3 w-70 "
 style="border-bottom: 1px solid rgba(255,255,255,.3);">
     <p class="fw-bold mb-0">${msg.name}</p>
     <p class="text-light small mb-0"><i class="far fa-clock"></i>${msg.createdAt.slice(11,16)}</p>
   </div>
   <div class="card-body">
     <p class="mb-0">${msg.message}</p>
   </div>
 </div>
</li>`     
    
    }
}
