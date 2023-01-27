
var backendapi = 'http://127.0.0.1:3000';
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let token = localStorage.getItem('token');
let decodetoken = parseJwt(token);
console.log(decodetoken)
let user_url = decodetoken.url;
let user_name = decodetoken.name;

window.addEventListener('DOMContentLoaded',(event)=>{
   
 listfriends();
 listgroups();
    axios.get(`${backendapi}/listfriends`,{headers:{"Authorization":token}}).then((response)=>{
       response.data.friends.forEach(element => {
        document.getElementById('userimage').innerHTML = `<img src= ${response.data.url} class="mb-4" alt="" />`
        document.getElementById('username').innerText = response.data.user;
        console.log(element)
        if(response.data.user != element.name){
            
          document.getElementById('Friends').innerHTML += `<li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255,255,255,.3) !important;">
          <a  class="d-flex justify-content-between link-light"><div class="d-flex flex-row">
              <img src= ${element.url} alt="avatar"
                class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
              <div class="pt-1">
                <p class="fw-bold mb-0">${element.name}</p>
                
              </div>
            </div>
            <div class="pt-1">
              <span class="input-group-btn">
                  <button class="btn " value = ${element.id} style="background-color: rgb(66, 5, 66); color: white;" onclick="sendmessage(this)">Chat</button>
                  </span>
            </div>
          </a>
        </li>`   
       }
    })
  }).catch((err)=>{
      console.log(err)
    })
    
    
    })

    let createGroup = document.getElementById("create-group");
    

async function addgroup(event){
    event.preventDefault();
    let form = new FormData(createGroup);
    let obj = {};
  obj["users"] = [];
  console.log(typeof(obj))
  for (const [key, value] of form) {
    console.log(key+'......'+value)
    if (key === "name") {
      obj["name"] = value;
    } else {
      obj["users"].push(Number(value));
    }
  }

    try{
     let response = await axios.post(`${backendapi}/addgroup`,{data:obj},{headers:{"Authorization":token}})
        if(response.status == 200){
            alert(response.data.message)
            listfriends();
            window.location = "./group_chat.html";


        } 
    }
    catch(err){
       alert(err);
    }

} 


async function listfriends(){
   try{
    const res = await axios.get(`${backendapi}/listfriends`,{headers:{"Authorization":token}})
    
    let data = res.data.friends !== undefined ? res.data.friends : [];

    for (const friend of data) {
      let id = friend.id;
      let name = friend.name;
      
      if(res.data.user != name){
       let checkBox = document.getElementById('check-box')
      let structure = `
      <input  class="form-check-input" type="checkbox" value="${id}" id="flexCheckDefault" name="${name}-${id}" >
      <label class="form-check-label" for="flexCheckDefault">
       ${name}
      </label>`;

      let ele = document.createElement("div");
     
      ele.innerHTML = structure;
      ele.setAttribute("class", "form-check ms-3");

      checkBox.appendChild(ele);
      
      }
    }
  } catch (err) {
    console.log(err);
  }
}


async function listgroups()
{
  const res = await axios.get(`${backendapi}/getgroup`,{headers:{"Authorization":token}})
  console.log(res.data.data.groups)
  let groups = res.data.data.groups;
  for (const group of groups) {
    let isAdmin = "";
 
   
 
  if (group.isAdmin == true) {
    document.getElementById('Groups').innerHTML +=`<li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255,255,255,.3) !important;">
     <a  class="d-flex justify-content-between link-light" >
      <div class="d-flex flex-row">
        <img src="https://thumbs.dreamstime.com/z/diverse-friend-group-people-hugging-together-adolescent-unity-back-view-man-woman-friends-standing-embracing-each-other-163568869.jpg" alt="avatar"
          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
        <div class="pt-1">
          <p class="fw-bold mb-0">${group.group.group_name}</p> 
        </div>
      </div>
      <div class="pt-1">
      <span class="input-group-btn">
              <button class="btn" id="btn-chat" style="background-color: rgb(66, 5, 66); color: white;" value=${group.group.id} onclick="startGroupChat(this)">Chat</button>
              </span>
        <span class="input-group-btn" id = 'admin'>
        <button class="btn" id="btn-chat" style="background-color: rgb(66, 5, 66); color: white;" value=${group.group.id}  onclick='admincall(this)'>Admin</button>
            </span>
           
      </div>
     </a>
  </li>`
  }
  if (group.isAdmin == null || group.isAdmin == false){
  
    document.getElementById('Groups').innerHTML +=`<li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255,255,255,.3) !important;">
     <a  class="d-flex justify-content-between link-light" >
      <div class="d-flex flex-row">
        <img src="https://thumbs.dreamstime.com/z/diverse-friend-group-people-hugging-together-adolescent-unity-back-view-man-woman-friends-standing-embracing-each-other-163568869.jpg" alt="avatar"
          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
        <div class="pt-1">
          <p class="fw-bold mb-0">${group.group.group_name}</p> 
        </div>
      </div>
      <div class="pt-1">
       
            <span class="input-group-btn">
              <button class="btn " id="btn-chat" style="background-color: rgb(66, 5, 66); color: white;" value=${group.group.id} onclick="startGroupChat(this)">Chat</button>
              </span>
      </div>
    </a>
  </li>`
  }
 
}
}

function startGroupChat(event) {
  localStorage.setItem("groupChat", event.value);
  console.log(event.value)

  window.location = "./group_message.html";
}

function sendmessage(event){
  localStorage.setItem('message',event.value)
  window.location = './p_message.html';
}

function admincall(event){
  localStorage.setItem('groupChat',event.value)
  window.location = './admin.html';
}