// app.js

// Function to save project data to localStorage
function saveProjectData(projectData) {
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

// Function to load project data from localStorage
function loadProjectData() {
    const projectData = localStorage.getItem('projectData');
    return projectData ? JSON.parse(projectData) : [];
}

// Function to update the project list with loaded project data
function updateProjectList() {
    const projectList = document.querySelector('.project-list');

    const projectData = loadProjectData();

    // Clear existing project list
    projectList.innerHTML = '';

    projectData.forEach(project => {
        const projectListItem = createProjectListItem(project);
        projectList.appendChild(projectListItem);
    });
}

// Function to create a project list item
function createProjectListItem(project) {
    const projectListItem = document.createElement('div');
    projectListItem.className = 'project-list-item';

    // Add the project information to the project list item
    projectListItem.innerHTML = `
        <div class="project-info">
            <h3>${project.name}</h3>
            <p>Description: ${project.description}</p>
            <p>Deadline: ${project.deadline}</p>
            <p>Status: ${project.status}</p>
            <p>Category: ${project.category}</p>
        </div>
        <div class="project-actions">
            <button onclick="editProject(this)">Edit</button>
            <button onclick="deleteProject(this)">Delete</button>
        </div>
    `;

    return projectListItem;
}

// Function to save a project
function saveProject() {
    const newProjectName = document.getElementById('project-name').value;
    const newProjectDescription = document.getElementById('project-description').value;
    const newProjectDeadline = document.getElementById('project-deadline').value;
    const newProjectStatus = document.getElementById('project-status').value;
    const newProjectCategory = document.getElementById('project-category').value;

    if (newProjectName) {
        // Create a new project object
        const project = {
            name: newProjectName,
            description: newProjectDescription,
            deadline: newProjectDeadline,
            status: newProjectStatus,
            category: newProjectCategory,
        };

        // Load existing project data, add the new project, and save it
        const projectData = loadProjectData();
        projectData.push(project);
        saveProjectData(projectData);

        // Create a new project list item and append it to the project list
        const projectList = document.querySelector('.project-list');
        const projectListItem = createProjectListItem(project);
        projectList.appendChild(projectListItem);

        // Clear the input fields and hide the edit form
        document.getElementById('project-name').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-deadline').value = '';
        document.getElementById('project-status').value = 'Not Started';
        document.getElementById('project-category').value = '';

        document.getElementById('project-edit-form').style.display = 'none';
    } else {
        alert('Project name cannot be empty.');
    }
}

// Initialize the project list with loaded project data
updateProjectList();
