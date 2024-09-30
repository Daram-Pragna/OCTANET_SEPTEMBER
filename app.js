let taskList = [];
let taskToEditIndex = null; // Track the task being edited

function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  
  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false
    };
    
    taskList.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

function renderTasks() {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = '';

  // Sort tasks: incomplete tasks first, then completed tasks
  const sortedTasks = [...taskList].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, sortedIndex) => {
    const originalIndex = taskList.indexOf(task); // Get the original index in the taskList array
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="edit" onclick="editTask(${originalIndex})">Edit</button>
        <button class="complete" onclick="toggleTask(${originalIndex})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="delete" onclick="deleteTask(${originalIndex})">Delete</button>
      </div>
    `;

    taskListElement.appendChild(taskItem);
  });
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  taskToEditIndex = index;
  const task = taskList[index];
  
  document.getElementById("edit-task-input").value = task.text; // Pre-fill the input with current task text
  document.getElementById("editModal").style.display = "block"; // Show the modal
}

function saveEdit() {
  const newTaskText = document.getElementById("edit-task-input").value.trim();
  
  if (newTaskText !== "") {
    taskList[taskToEditIndex].text = newTaskText;
    renderTasks();
    closeModal();
  }
}

function closeModal() {
  document.getElementById("editModal").style.display = "none"; // Close the modal
}
