
const addTaskBtn = document.getElementById("add-task-btn");
const taskModal = document.getElementById("task-modal");
const closeModalBtn = document.querySelector(".close-btn");
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");
const totalTasksCount = document.getElementById("total-tasks");
const inProgressTasksCount = document.getElementById("in-progress-tasks");
const completedTasksCount = document.getElementById("completed-tasks");

// helps  to Store Data (task array)
let tasks = [];

// code for Updating of Task Counters
function updateTaskCounters() {
  const total = tasks.length;
  const inProgress = tasks.filter(task => task.status === "in-progress").length;
  const completed = tasks.filter(task => task.status === "completed").length;

  totalTasksCount.textContent = total;
  inProgressTasksCount.textContent = inProgress;
  completedTasksCount.textContent = completed;
}

// code for Function to Render Tasks in the Task List
function renderTasks() {
  taskContainer.innerHTML = ""; // Clears the task list

  tasks.forEach((task, index) => {
    // Create Task List Item
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    // for task Details
    taskItem.innerHTML = `
      <div>
        <span><strong>${task.name}</strong> (${task.priority})</span>
        <span>Deadline: ${task.deadline}</span>
      </div>
      <div>
        <button class="edit-btn" data-index="${index}">✏️</button>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      </div>
    `;

    // Add Task List Item to Task Container
    taskContainer.appendChild(taskItem);
  });

  // Add Event Listeners for Edit and Delete Buttons
  document.querySelectorAll(".edit-btn").forEach(button =>
    button.addEventListener("click", editTask)
  );
  document.querySelectorAll(".delete-btn").forEach(button =>
    button.addEventListener("click", deleteTask)
  );

  // updates task counters
  updateTaskCounters();
}

// code for function to add or update task
function saveTask(e) {
  e.preventDefault();

  // gather input values
  const name = document.getElementById("task-name").value;
  const priority = document.getElementById("task-priority").value;
  const status = document.getElementById("task-status").value;
  const deadline = document.getElementById("task-deadline").value;

  const existingTaskIndex = taskForm.dataset.editIndex;

  if (existingTaskIndex !== undefined) {
    // Update Existing Task
    tasks[existingTaskIndex] = { name, priority, status, deadline };
    delete taskForm.dataset.editIndex;
  } else {
    // Add New Task
    tasks.push({ name, priority, status, deadline });
  }

  // Clear Form and Close Modal
  taskForm.reset();
  taskModal.classList.add("hidden");

  // Render Updated Task List
  renderTasks();
}

// Function to Edit Task
function editTask(e) {
  const taskIndex = e.target.dataset.index;
  const task = tasks[taskIndex];

  // Populate Form with Task Data
  document.getElementById("task-name").value = task.name;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-deadline").value = task.deadline;

  // Set Edit Index on Form
  taskForm.dataset.editIndex = taskIndex;

  // Open Modal
  taskModal.classList.remove("hidden");
}

// Function to Delete Task
function deleteTask(e) {
  const taskIndex = e.target.dataset.index;

  // Remove Task from Array
  tasks.splice(taskIndex, 1);

  // Render Updated Task List
  renderTasks();
}

// Event Listeners
addTaskBtn.addEventListener("click", () => {
  taskForm.reset();
  delete taskForm.dataset.editIndex; // Clear Edit Index
  taskModal.classList.remove("hidden"); // Show Modal
});

closeModalBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden"); // Hide Modal
});

taskForm.addEventListener("submit", saveTask);

// Initial Render
renderTasks();
