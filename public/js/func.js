let user = {
  userEmail: "",
  userUsername: "",
  userPassword: "",
};

let username = document.querySelector("#username");
if(username){
  username.addEventListener("change", function (event) {
    user.userUsername = event.target.value;
  });
}


let password = document.querySelector("#password");
if(password){
  password.addEventListener("change", function (event) {
    user.userPassword = event.target.value;
  });
}


let email = document.querySelector("#email");
if(email){
  email.addEventListener("change", function (event) {
    user.userEmail = event.target.value;
  });
}

//login :
let form = document.querySelector("#login");
if(form){
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let item = {
      username: user.userUsername,
      password: user.userPassword,
    };
    let rawData = await fetch("http://localhost:9999/user/login-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let result = rawData.json();
    if(result.message == "Fail"){
      alert("Username/Password Mismatch!!!");
    }
  });
}

//signup :
let form1 = document.querySelector("#signup");
if(form1){
  form1.addEventListener("submit", async function (event) {
    event.preventDefault();
    let item = {
      email: user.userEmail,
      username: user.userUsername,
      password: user.userPassword,
    };
    let rawData = await fetch("http://localhost:9999/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item),
    });
  });
}

//logout :
let btn = document.querySelector("#btn");
if(btn){
  btn.addEventListener("click",async function () {
    // console.log(username);
    // localStorage.clear();
    let rawData = await fetch("http://localhost:9999/user/logout",{ 
      method: "get",
      headers: {
      "Content-Type": "application/json"
      }
    });
  });
}