const usersFromStorage = JSON.parse(window.localStorage.getItem("users"));

const msgLogin = document.querySelector(".form-login .msg");
const loginButton = document.querySelector("#login-acc-btn");
const loginEmail = document.querySelector("#login-input-email");
const loginPW = document.querySelector("#login-input-password");

const msgRegister = document.querySelector(".form-register .msg");
const createAccButton = document.querySelector("#create-acc-btn");
const createAccName = document.querySelector("#register-input-name");
const createAccEmail = document.querySelector("#register-input-email");
const createAccPW = document.querySelector("#register-input-password");

const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: "123"
  }
];

if (usersFromStorage !== null) {

  usersFromStorage.map(user => {
    if (users.findIndex(u => u.email === user.email) === -1) {
      users.push(user)
    }
  })
}

loginButton.addEventListener("click", function (event) {

  const email = loginEmail.value;
  const password = loginPW.value;

  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    msgLogin.textContent = "E-mail e/ou senha invalidos";

  } else {
    const checkPW = users[userIndex].password === password;

    if (checkPW) {
      window.localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))
      window.location.href = "/src/TasksPage/tasksPage.html";

    } else {
      msgLogin.textContent = "E-mail e/ou senha invalidos";
    }
  }
})

loginEmail.addEventListener("input", function (event) {
  msgLogin.textContent = "";
})

loginPW.addEventListener("input", function (event) {
  msgLogin.textContent = "";
})


createAccButton.addEventListener("click", function (event) {

  const name = createAccName.value.trim();
  const email = createAccEmail.value.trim();
  const password = createAccPW.value.trim();

  const userIndex = users.findIndex(user => user.email === email);


  if (!name || !email || !email.includes("@") || !email.includes(".") || !password) {

    msgRegister.textContent = "Insira um nome, e-mail e senha válidos";


  } else if (userIndex === -1) {
    const user = {
      name,
      email,
      password
    };

    users.push(user)

    window.localStorage.setItem("users", JSON.stringify(users))
    window.localStorage.setItem("currentUser", JSON.stringify(user))

    console.log(users[userIndex]);

    window.location.href = "/src/TasksPage/tasksPage.html";

  } else {
    msgRegister.textContent = "E-mail já cadastrado";
  }
})

createAccName.addEventListener("input", function (event) {
  msgRegister.textContent = "";
})

createAccEmail.addEventListener("input", function (event) {
  msgRegister.textContent = "";
})

createAccPW.addEventListener("input", function (event) {
  msgRegister.textContent = "";
})


