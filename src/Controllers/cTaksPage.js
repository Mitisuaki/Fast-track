const userName = document.querySelector(".userName");
const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

const exit = document.querySelector(".navbar div a")


exit.addEventListener("click", function (event) {
  window.localStorage.setItem("currentUser", null)
})

if (currentUser === null) {
  alert("Para acessar esta página você precisa realizar o login");
  window.location.href = "../index.html";

} else {
  userName.textContent = `Seja bem-vindo(a) ${currentUser.name}`;

}


