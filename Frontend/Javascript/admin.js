let addFriends = document.getElementById("admin-add-friend");
const token = localStorage.getItem('token');

let removeFriends = document.getElementById("admin-remove-friend");
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded", loadFriends);

var backendapi = 'http://127.0.0.1:3000';
async function loadFriends() {
    let id = localStorage.getItem("groupChat");
    try {
      let res = await axios.get(`${backendapi}/list?id=` + id,{headers:{"Authorization":token}});
  
      let friends =
        res.data.data.notFriends != undefined ? res.data.data.notFriends : [];
  
      let notFriends =
        res.data.data.friends != undefined ? res.data.data.friends : [];
  
      // Add Friends
      let addFriendsBody = "";
      for (const friend of friends) {
        let tr = ` <tr>
          <td>${friend.name}</td>
          <td><button class="btn btn-primary" value="${friend.id}" onclick="addUser(this)">Add</button></td>
        </tr>`;
  
        addFriendsBody += tr;
      }
      let addFriendsStructure = `
                          <thead>
                          <th>Friend</th>
                          <th>Add</th>
                          <th>Admin</th>
                      </thead>
                      <tbody>
                          ${addFriendsBody}
                      </tbody>`;
  
      addFriends.innerHTML = addFriendsStructure;
  
      // Remove Friend Body
  
      let removeFriendsBody = "";
      for (const friend of notFriends) {
        let isAdmin = `<td><button class="btn btn-primary" value="${friend.user.id}" onclick="modifyAdmin(this)">Add Admin</button></td>`;
        console.log(friend);
        if (friend.isAdmin === true) {
          isAdmin = `<td><button class="btn btn-danger" value="${friend.user.id}" onclick="modifyAdmin(this)">Remove Admin</button></td>`;
        }
  
        let tr = ` <tr>
          <td>${friend.user.name}</td>
          <td><button class="btn btn-danger" value="${friend.user.id}" onclick="removeUser(this)">Remove</button></td>
          ${isAdmin}
        </tr>`;
  
        removeFriendsBody += tr;
      }
      let removeFriendsStructure = `
                          <thead>
                          <th>Friend</th>
                          <th>Remove</th>
                          <th>Admin</th>
                      </thead>
                      <tbody>
                          ${removeFriendsBody}
                      </tbody>`;
  
      removeFriends.innerHTML = removeFriendsStructure;
    } catch (err) {
      console.log(err);
    }
  }

  async function removeUser(event) {
    let id = event.value;
    let gId = localStorage.getItem("groupChat");
    try {
      let res = await axios.delete(`${backendapi}/friends/remove`,
        {data: { groupId: gId, userId: id },
      });
  
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async function addUser(event) {
    let id = event.value;
    let gId = localStorage.getItem("groupChat");
    try {
      let res = await axios.post(`${backendapi}/friends/add`,
        {data: { groupId: gId, userId: id },
      });
  
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async function modifyAdmin(event) {
    let id = event.value;
    let gId = localStorage.getItem("groupChat");
    try {
      let res = await axios.put(`${backendapi}/admin/modify`,
        {data: { groupId: gId, userId: id },
      });
  
      if (res) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }