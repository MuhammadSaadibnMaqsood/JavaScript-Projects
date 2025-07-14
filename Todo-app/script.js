let title = "";
let priority = "";
let tasksarr = [];
let editingTask = { title: null, priority: null };
let totalTask = 0;
let completed = 0;
let pending = 0;
let completionRate = 0;

function hideModel() {
  const model = document.getElementById("model");
  title = document.getElementById("title").value.trim();
  priority = document.getElementById("priority").value;

  if (!title) {
    alert("Please enter a title!");
    return;
  }

  if (editingTask.title !== null) {
    tasksarr = tasksarr.map((item) => {
      if (item.title.toLowerCase() === editingTask.title) {
        return { ...item, title: title, priority: priority };
      }
      return item;
    });
    editingTask.title = null;
    editingTask.priority = null;
  } else {
    tasksarr.push({ title: title, priority: priority, check: false });
    totalTask++;
  }

  renderTasks();
  updateStatistic();

  model.classList.add("hidden");
  model.innerHTML = "";
}

function showModel() {
  const model = document.getElementById("model");

  model.classList.remove("hidden");

  model.innerHTML = `
     <input id="title" type="text" placeholder="Enter task name" />
     <select name="priority" id="priority">
       <option value="High">High</option>
       <option value="medium">Medium</option>
       <option value="low">Low</option>
     </select>
     <button id="addbtn" onclick="hideModel()">Add</button>
  `;

  setTimeout(() => {
    if (editingTask.title !== null) {
      document.getElementById("addbtn").innerText = "Update";
    }
  }, 0);
}

function renderTasks() {
  const task = document.getElementById("task-holder");
  task.innerHTML = "";
  tasksarr.forEach((item) => {
    task.innerHTML += `<div class="task-item">
      <div>
        <span><input onchange="toggleCheck(this)" class="checkbox" type="checkbox" ${item.check ? 'checked' : ''}></span>
        <span>Title: </span><span class="titlespan">${item.title}</span> <span class="priorityspan">${item.priority}</span>
      </div>
      <div class="btn-holder">
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
      </div>
    </div>`;
  });
}

function toggleCheck(checkbox) {
  const taskDiv = checkbox.closest(".task-item");
  const title = taskDiv.querySelector(".titlespan").innerText.trim().toLowerCase();

  tasksarr = tasksarr.map((item) => {
    if (item.title.toLowerCase() === title) {
      return { ...item, check: checkbox.checked };
    }
    return item;
  });

  updateStatistic();
}

function updateStatistic() {
  const total = document.getElementById("Total");
  total.innerText = totalTask;

  completed = tasksarr.filter((item) => item.check).length;
  pending = totalTask - completed;

  const complete = document.getElementById("complete");
  complete.innerText = completed;

  const Pending = document.getElementById("pending");
  Pending.innerText = pending;

  const completionRateEl = document.getElementById("completion-rate");
  if (totalTask > 0) {
    completionRate = Math.round((completed / totalTask) * 100);
  } else {
    completionRate = 0;
  }
  completionRateEl.innerText = completionRate + "%";
}

function editTask(button) {
  const task = button.closest(".task-item");
  const titlespan = task.querySelector(".titlespan");
  const priorityspan = task.querySelector(".priorityspan");
  let currentValue = titlespan.innerText.trim();
  let currentPriority = priorityspan.innerText;

  editingTask.title = currentValue.toLowerCase();
  editingTask.priority = currentPriority;

  showModel();

  setTimeout(() => {
    document.getElementById("title").value = currentValue;
    document.getElementById("priority").value = currentPriority;
  }, 50);
}

function deleteTask(button) {
  const task = button.closest(".task-item");
  const titlespan = task.querySelector(".titlespan");
  let deleteTask = titlespan.innerText.trim().toLowerCase();

  tasksarr = tasksarr.filter((t) => t.title.toLowerCase() !== deleteTask);
  totalTask--;
  renderTasks();
  updateStatistic();
}



