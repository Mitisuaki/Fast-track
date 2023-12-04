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
const btnsArea = document.querySelector("#buttons-area");

const createTaskBtnInnerHtml = `
<div class="d-flex justify-content-center mt-2 mb-3">
<button id="create-task-btn" type="submit" class="btn btn-dark">Criar Tarefa</button>
</div>
 `;
const editBtnsInnerHtmlNR = `
<div class="d-flex flex-column flex-md-row justify-content-center mt-2 mb-3">
<button id="edit-task-btn" type="submit" class="btn btn-dark m-1">Alterar
  Tarefa</button>
<button id="mark-as-done-task-btn" type="submit" class="btn btn-dark m-1">Marca como
  não Realizada</button>
<button id="delete-task-btn" type="submit" class="btn btn-dark m-1">Excluir
  Tarefa</button>
<button id="cancel-task-btn" type="submit" class="btn btn-dark m-1">Cancelar</button>
</div>
 `;
const editBtnsInnerHtmlR = `
<div class="d-flex flex-column flex-md-row justify-content-center mt-2 mb-3">
<button id="edit-task-btn" type="submit" class="btn btn-dark m-1">Alterar
  Tarefa</button>
<button id="mark-as-done-task-btn" type="submit" class="btn btn-dark m-1">Marca como
  Realizada</button>
<button id="delete-task-btn" type="submit" class="btn btn-dark m-1">Excluir
  Tarefa</button>
<button id="cancel-task-btn" type="submit" class="btn btn-dark m-1">Cancelar</button>
</div>
 `;

const populateTable = () => {

  taskTableBody.innerHTML = "";

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
    <td>${t.status}</td>
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

}


const validateInputs = () => {
  let hasInvalidInput = false;
  const validate = document.querySelectorAll("#form-create-task [required]");
  validate.forEach(element => {
    if (!element.value) {
      hasInvalidInput = true;
    }
  });

  if (!hasInvalidInput) {
    return true
  } else {
    return false
  }
};

const validateDateInputs = () => {
  const day1 = `${startDay.value.replace("-", ",")},${startTime.value.replace("-", ",")}`;
  const day2 = `${endDay.value.replace("-", ",")}, ${endTime.value.replace("-", ",")}`;
  const startDate = new Date(day1);
  const endDate = new Date(day2);

  if (startDate > endDate) {
    return false
  } else {
    return true
  }
}

const clearInputs = () => {
  task.value = "";
  startDay.value = "";
  startTime.value = "";
  endDay.value = "";
  endTime.value = "";
  description.value = "";
};

const fixEditBtns = (currentTask) => {
  const editTaskBtn = document.querySelector("#edit-task-btn");
  const markTaskBtn = document.querySelector("#mark-as-done-task-btn");
  const deleteTaskBtn = document.querySelector("#delete-task-btn");
  const cancelTaskBtn = document.querySelector("#cancel-task-btn");

  editTaskBtn.addEventListener("click", () => {
    const validInputs = validateInputs();

    if (validInputs) {

      if (!validateDateInputs()) {
        msgCreateTask.textContent = "Por favor entre duas datas validas, pois o dia/horário de término não pode ser igual ou anterior ao de início";
      } else {
        currentTask.task = task.value;
        currentTask.startDay = startDay.value;
        currentTask.startTime = startTime.value;
        currentTask.endDay = endDay.value;
        currentTask.endTime = endTime.value;
        currentTask.description = description.value;


        const tasksEdited = JSON.parse(tasks).map(t => {
          if (t.id === currentTask.id) {
            t = currentTask;
          }
          return t;
        });

        localStorage.setItem("tasks", JSON.stringify(tasksEdited));
        location.reload();
      }
    }

  });
  markTaskBtn.addEventListener("click", () => {

    if (!currentTask.status) {
      currentTask.status = "Realizada";
    } else {
      currentTask.status = undefined;
    }

    const tasksEdited = JSON.parse(tasks).map(t => {
      if (t.id === currentTask.id) {
        t = currentTask;
      }
      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksEdited));
    location.reload();

  });
  deleteTaskBtn.addEventListener("click", () => {

    const tasksEdited = JSON.parse(tasks).filter(t => t.id !== currentTask.id);

    console.log(tasksEdited);

    localStorage.setItem("tasks", JSON.stringify(tasksEdited));
    location.reload();

  });
  cancelTaskBtn.addEventListener("click", () => {
    location.reload();
  });
};

const clickEditFunction = (btn) => {
  const tr = btn.parentElement.parentElement;

  const currentTask = userTasks.find(t => +t.id === +tr.id);

  task.value = currentTask.task;
  startDay.value = currentTask.startDay;
  startTime.value = currentTask.startTime;
  endDay.value = currentTask.endDay;
  endTime.value = currentTask.endTime;
  description.value = currentTask.description;

  if (currentTask.status === "Realizada") {

    btnsArea.innerHTML = editBtnsInnerHtmlNR;

  } else {

    btnsArea.innerHTML = editBtnsInnerHtmlR;

  }

  fixEditBtns(currentTask);
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
  makeAtask.id = "makeAtask"
  makeAtask.innerHTML = `
  Crie sua primeira Tarefa acima!
  `;
  makeAtask.classList.add("d-flex", "justify-content-center", "mt-5", "mb-5", "fs-4")

  taskArea.appendChild(makeAtask);

} else {
  populateTable();
}

exit.addEventListener("click", () => {
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

createTaskBtn.addEventListener("click", () => {

  const validInputs = validateInputs();

  if (validInputs) {

    if (!validateDateInputs()) {
      msgCreateTask.textContent = "Por favor entre duas datas validas, pois o dia/horário de término não pode ser igual ou anterior ao de início";
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



startDay.addEventListener("change", () => {
  msgCreateTask.textContent = ""
});

startTime.addEventListener("change", () => {
  msgCreateTask.textContent = ""
});

endDay.addEventListener("change", () => {
  msgCreateTask.textContent = ""
});

endTime.addEventListener("change", () => {
  msgCreateTask.textContent = ""
});


