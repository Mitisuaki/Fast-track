const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
const userName = document.querySelector(".username");

const taskTableBody = document.querySelector("#task-table-body");

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

console.log(taskTableBody.children.length)

// Teste com setInterval
var intervalID = window.setInterval(checkWeatherAPI, 1000);

function checkWeatherAPI() {

  const nowTime = new Date(2023, 12, 5);
  const check1 = new Date(2022, 12, 1);
  const check2 = new Date(2023, 1, 10);

  if (nowTime > check1 && nowTime < check2) {

    console.log("True");
  } else {
    console.log("False");
  }
}
