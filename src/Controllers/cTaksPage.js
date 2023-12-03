const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
const userName = document.querySelector(".username");

const exit = document.querySelector(".btn-sair");


exit.addEventListener("click", function (event) {
  window.localStorage.setItem("currentUser", null)
})

if (currentUser === null) {
  alert("Para acessar esta página você precisa realizar o login");
  window.location.href = "../index.html";

} else {
  userName.textContent = `Seja bem-vindo(a) ${currentUser.name}`;

}


