document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterSelect = document.getElementById("filterTasks");
    const clearAllBtn = document.getElementById("clearAllBtn");
    
    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        let tasks = getTasks();

        if (filter !== "all") {
            tasks = tasks.filter(task => task.completed === (filter === "completed"));
        }

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            if (task.completed) {
                li.classList.add("completed");
            }
            
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="edit-btn" onclick="editTask(${index})">✎</button>
                <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return;

        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        taskInput.value = "";
        renderTasks();
    }

    function deleteTask(index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    }

    function toggleTask(index) {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    }

    function editTask(index) {
        const tasks = getTasks();
        const newText = prompt("Yeni görev metnini girin:", tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks(tasks);
            renderTasks();
        }
    }

    function clearAllTasks() {
        localStorage.removeItem("tasks");
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);
    filterSelect.addEventListener("change", (e) => renderTasks(e.target.value));
    clearAllBtn.addEventListener("click", clearAllTasks);
    renderTasks();
});
