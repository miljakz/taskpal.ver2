document.addEventListener('DOMContentLoaded', function () {
    let newProjectCounter = 0;
    let newTaskCounter = 0;

    function showProjectForm() {
        document.getElementById("project-edit-form").style.display = "block";
    }

    function editProject(button) {
        const projectInfo = button.parentElement.parentElement.querySelector(".project-info");
        const projectName = projectInfo.querySelector("h3").innerText;
        const projectDescription = projectInfo.querySelector("p:nth-child(2)").innerText;
        const projectDeadline = projectInfo.querySelector("p:nth-child(3)").innerText;
        const projectStatus = projectInfo.querySelector("p:nth-child(4)").innerText;
        const projectCategory = projectInfo.querySelector("p:nth-child(5)").innerText;

        document.getElementById("project-name").value = projectName;
        document.getElementById("project-description").value = projectDescription.replace("Description: ", "");
        document.getElementById("project-deadline").value = projectDeadline.replace("Deadline: ", "");
        document.getElementById("project-status").value = projectStatus.replace("Status: ", "");
        document.getElementById("project-category").value = projectCategory.replace("Category: ", "");

        projectInfo.style display = "none";
        button.style display = "none";
        document.getElementById("project-edit-form").style.display = "block";
    }

    function saveProject(button) {
        const newProjectName = document.getElementById("project-name").value;
        const newProjectDescription = document.getElementById("project-description").value;
        const newProjectDeadline = document.getElementById("project-deadline").value;
        const newProjectStatus = document.getElementById("project-status").value;
        const newProjectCategory = document.getElementById("project-category").value;

        if (newProjectName) {
            const projectListItem = document.createElement("div");
            projectListItem.className = "project-list-item";
            projectListItem.innerHTML = `
                <div class="project-info">
                    <h3>${newProjectName}</h3>
                    <p>Description: ${newProjectDescription}</p>
                    <p>Deadline: ${newProjectDeadline}</p>
                    <p>Status: ${newProjectStatus}</p>
                    <p>Category: ${newProjectCategory}</p>
                </div>
                <div class="project-actions">
                    <button onclick="editProject(this)">Edit</button>
                    <button onclick="deleteProject(this)">Delete</button>
                </div>
            `;

            const projectList = document.querySelector(".project-list");
            projectList.insertBefore(projectListItem, projectList.firstChild);

            document.getElementById("project-name").value = "";
            document.getElementById("project-description").value = "";
            document.getElementById("project-deadline").value = "";
            document.getElementById("project-status").value = "Not Started";
            document.getElementById("project-category").value = "";

            document.getElementById("project-edit-form").style.display = "none";
        } else {
            alert("Project name cannot be empty.");
        }
    }

    function deleteProject(button) {
        const projectItem = button.parentElement.parentElement;
        projectItem.remove();
    }

    function cancelEditProject(button) {
        const projectInfo = button.parentElement.parentElement.querySelector(".project-info");
        projectInfo.style.display = "block";

        document.getElementById("project-name").value = "";
        document.getElementById("project-description").value = "";
        document.getElementById("project-deadline").value = "";
        document.getElementById("project-status").value = "Not Started";
        document.getElementById("project-category").value = "";

        button.style.display = "inline-block";
        document.getElementById("project-edit-form").style.display = "none";
    }

    function deleteNewProject(button) {
        const projectForm = button.parentElement.parentElement;
        projectForm.style.display = "none;
    }

    function showTaskForm() {
        document.getElementById("task-edit-form").style.display = "block";
    }

    function editTask(button) {
        const taskInfo = button.parentElement.parentElement.querySelector(".project-info");
        const taskName = taskInfo.querySelector("h3").innerText;
        const taskDescription = taskInfo.querySelector("p:nth-child(2)").innerText;
        const taskDeadline = taskInfo.querySelector("p:nth-child(3)").innerText;
        const taskStatus = taskInfo.querySelector("p:nth-child(4)").innerText;

        document.getElementById("task-name").value = taskName;
        document.getElementById("task-description").value = taskDescription.replace("Description: ", "");
        document.getElementById("task-deadline").value = taskDeadline.replace("Deadline: ", "");
        document.getElementById("task-status").value = taskStatus.replace("Status: ", "");

        taskInfo.style.display = "none";
        button.style.display = "none";
        document.getElementById("task-edit-form").style.display = "block";
    }

    function saveTask(button) {
        const newTaskName = document.getElementById("task-name").value;
        const newTaskDescription = document.getElementById("task-description").value;
        const newTaskDeadline = document.getElementById("task-deadline").value;
        const newTaskStatus = document.getElementById("task-status").value;

        if (newTaskName) {
            const taskListItem = document.createElement("div");
            taskListItem.className = "project-list-item";
            taskListItem.innerHTML = `
                <div class="project-info">
                    <h3>${newTaskName}</h3>
                    <p>Description: ${newTaskDescription}</p>
                    <p>Deadline: ${newTaskDeadline}</p>
                    <p>Status: ${newTaskStatus}</p>
                </div>
                <div class="project-actions">
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>
                </div>
            `;

            const taskList = document.querySelector(".project-list:nth-child(2)");
            taskList.insertBefore(taskListItem, taskList.firstChild);

            document.getElementById("task-name").value = "";
            document.getElementById("task-description").value = "";
            document.getElementById("task-deadline").value = "";
            document.getElementById("task-status").value = "Not Started";

            document.getElementById("task-edit-form").style.display = "none";
        } else {
            alert("Task name cannot be empty.");
        }
    }

    function deleteTask(button) {
        const taskItem = button.parentElement.parentElement;
        taskItem.remove();
    }

    function cancelEditTask(button) {
        const taskInfo = button.parentElement.parentElement.querySelector(".project-info");
        taskInfo.style.display = "block";

        document.getElementById("task-name").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("task-deadline").value = "";
        document.getElementById("task-status").value = "Not Started";

        button.style.display = "inline-block";
        document.getElementById("task-edit-form").style.display = "none";
    }

    function deleteNewTask(button) {
        const taskForm = button.parentElement.parentElement;
        taskForm.style.display = "none;
    }

    function completeProject(button) {
        const projectItem = button.parentElement.parentElement;
        projectItem.style.backgroundColor = "#7FFF7F";
        button.style.display = "none";
    }
});

