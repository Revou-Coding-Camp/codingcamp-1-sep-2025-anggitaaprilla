const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoList = document.getElementById("todoList");

let todos = [];

// Render Todo List
function renderTodos(list) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        <span class="status ${todo.completed ? "completed" : "pending"}">
          ${todo.completed ? "Completed" : "Pending"}
        </span>
      </td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTodo(${index})">🗑</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

// Add Todo
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please enter task and date!");
    return;
  }

  todos.push({ task, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos(todos);
});

// Toggle Status
function toggleStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos(todos);
}

// Delete Todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

// Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos(todos);
  }
});

// Filter Completed
let isFiltered = false;
filterBtn.addEventListener("click", () => {
  if (isFiltered) {
    renderTodos(todos);
  } else {
    const filtered = todos.filter(todo => !todo.completed);
    renderTodos(filtered);
  }
  isFiltered = !isFiltered;
});

// Initial Render
renderTodos(todos);
