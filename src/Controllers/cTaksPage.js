console.log(localStorage)

const formCreateTask = document.querySelector("#form-create-task")
const taskTableBody = document.querySelector("#task-table-body");
const createTaskBtn = document.querySelector("#create-task-btn");
const msgCreateTask = document.querySelector("#form-create-task .msg");
const exit = document.querySelector(".btn-sair");
const modalDescription = document.getElementById("modal-description");
const tasks = localStorage.getItem("tasks");
let nextId = +localStorage.getItem("nextId");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userName = document.querySelector(".username");
const task = formCreateTask.querySelector("#create-task-task");
const startDay = formCreateTask.querySelector("#create-task-start-day");
const startTime = formCreateTask.querySelector("#create-task-start-time");
const endDay = formCreateTask.querySelector("#create-task-end-day");
const endTime = formCreateTask.querySelector("#create-task-end-time");
const description = formCreateTask.querySelector("#create-task-description");

const validateInputs = (task, startDay, startTime, endDay, endTime, description) => {
  if (!task || !startDay || !startTime || !endDay || !endTime || !description) {
    return false;
  } else {
    return true;
  }
}
const clearInputs = () => {
  task.value = "";
  startDay.value = "";
  startTime.value = "";
  endDay.value = "";
  endTime.value = "";
  description.value = "";
}
const clickEditFunction = (btn) => {
  const tr = btn.parentElement.parentElement;

  const currentTask = userTasks.find(t => +t.id === +tr.id);

  task.value = currentTask.task;
  startDay.value = currentTask.startDay;
  startTime.value = currentTask.startTime;
  endDay.value = currentTask.endDay;
  endTime.value = currentTask.endTime;
  description.value = currentTask.description;

};

if (currentUser === null) {
  alert("Para acessar esta página você precisa realizar o login");
  window.location.href = "../index.html";

} else {
  userName.textContent = `Seja bem-vindo(a) ${currentUser.name}`;
}

if (!nextId && !tasks) {
  localStorage.setItem("nextId", 0);
  localStorage.setItem("tasks", JSON.stringify([]));
} else if (!tasks) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

const userTasks = JSON.parse(tasks).filter(t => t.userEmail === currentUser.email);

if (userTasks.length === 0) {

  const taskArea = document.querySelector("#tasks-area");
  const table = document.querySelector("#tasks-table");
  table.classList.add("d-none");

  const makeAtask = document.createElement("div");
  makeAtask.innerHTML = `
  Crie sua primeira Tarefa acima!
  `;
  makeAtask.classList.add("d-flex", "justify-content-center", "mt-5", "mb-5", "fs-4")

  taskArea.appendChild(makeAtask);

}



userTasks.forEach(t => {

  const day1 = `${t.startDay.replaceAll("-", ",")},${t.startTime.replaceAll("-", ",")}`;
  const day2 = `${t.endDay.replaceAll("-", ",")}, ${t.endTime.replaceAll("-", ",")}`;
  const startDate = new Date(day1);
  const endDate = new Date(day2);
  const nowDate = new Date();

  const startDateInput = t.startDay.replaceAll("-", "");
  const startY = startDateInput.slice(0, 4);
  const startM = startDateInput.slice(4, 6);
  const startD = startDateInput.slice(6, 8);
  const endDateInput = t.endDay.replaceAll("-", "");
  const endY = endDateInput.slice(0, 4);
  const endM = endDateInput.slice(4, 6);
  const endD = endDateInput.slice(6, 8);

  const newTr = document.createElement("tr");

  newTr.innerHTML = `
    <td class="tr-tarefa" data-bs-toggle="modal" data-bs-target="#modal-description" description="${t.description}">
        ${t.task}
    </td>
    <td>${startD}/${startM}/${startY} às ${t.startTime}</td>
    <td>${endD}/${endM}/${endY} às ${t.endTime}</td>
    <td></td>
    <td><button class="btn btn-light update-task-btn" tr-id="${t.id}" onclick="clickEditFunction(this)">Alterar</button></td>
  `;


  newTr.id = t.id;

  const status = newTr.querySelector(":nth-child(4)");

  if (status.innerText !== "Realizada") {

    if (startDate > nowDate) {
      status.innerText = "Pendente";
    } else if (startDate < nowDate && nowDate < endDate) {
      status.innerText = "Em andamento";
    } else {
      status.innerText = "Em atraso";
    }
  }

  taskTableBody.appendChild(newTr);
});



exit.addEventListener("click", event => {
  localStorage.setItem("currentUser", null)
});



modalDescription.addEventListener("show.bs.modal", event => {

  const button = event.relatedTarget;
  const task = button.innerText;
  const description = button.getAttribute("description");
  const modalTitle = modalDescription.querySelector(".modal-title");
  const modalBodyInput = modalDescription.querySelector("textarea");

  modalTitle.textContent = `${task}`;
  modalBodyInput.value = description;
});

createTaskBtn.addEventListener("click", event => {

  const validInputs = validateInputs(task.value, startDay.value, startTime.value, endDay.value, endTime.value, description.value);

  if (validInputs) {
    const day1 = `${startDay.value.replace("-", ",")},${startTime.value.replace("-", ",")}`;
    const day2 = `${endDay.value.replace("-", ",")}, ${endTime.value.replace("-", ",")}`;
    const startDate = new Date(day1);
    const endDate = new Date(day2);

    if (startDate > endDate) {
      msgCreateTask.textContent = "Por favor entre duas datas validas, pois o dia/horário de término não pode ser igual ou anterior ao de início"
    } else {

      const newTask = {
        id: nextId,
        userEmail: currentUser.email,
        task: task.value,
        startDay: startDay.value,
        startTime: startTime.value,
        endDay: endDay.value,
        endTime: endTime.value,
        description: description.value
      };

      const tasksUpdate = JSON.parse(tasks);
      tasksUpdate.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasksUpdate));

      nextId++;
      localStorage.setItem("nextId", nextId);

      location.reload();
    }

  }
});
