import { renderAllTodos, todos } from './index.js'; // Import the centralized rendering function and todos array
const all = document.querySelector(".all");
const today = document.querySelector(".today");
const completed = document.querySelector(".completed"); // Select the "Completed" button
const content = document.querySelector('.todo-list');
let activeProject = null; // Tracks the currently selected project

// Event listener for the "All" button
all.addEventListener("click", function () {
    content.innerHTML = ''; // Clear the current content

    const projectTodos = todos.filter(todo => todo.project === activeProject);
    projectTodos.forEach(todo => todo.render());
});

// Event listener for the "Today" button
today.addEventListener("click", function () {
    content.innerHTML = ''; // Clear the current content

    const todayDate = new Date().toISOString().split('T')[0];

    const todaysTodos = todos.filter(todo => todo.date === todayDate && todo.project === activeProject);
    // Filter todos based on the selected project and today's date

    todaysTodos.forEach(todo => todo.render());
});

// Event listener for the "Completed" button
completed.addEventListener("click", function () {
    content.innerHTML = ''; // Clear the current content

    const completedTodos = todos.filter(todo => todo.isCompleted && todo.project === activeProject);
    // Filter todos based on the selected project and completed status

    completedTodos.forEach(todo => todo.render());
});

const createProjectBtn = document.querySelector('.create-project-btn');
const projectContainer = document.createElement('div');
projectContainer.classList.add('project-container');
document.querySelector('.sidebar').appendChild(projectContainer);

const addbtn = document.querySelector('.add-todo-btn'); // Initialize addbtn here

// Disable the "Add To-Do" button if no projects exist
if (projectContainer.children.length === 0) {
    addbtn.disabled = true;
    addbtn.title = "Please create a project first!";
} else {
    addbtn.disabled = false;
    addbtn.title = "";
}



createProjectBtn.addEventListener('click', function () {
    const modal = document.createElement('dialog');
    modal.classList.add('modal');
    modal.innerHTML = `
        <button class="modal-close-btn">&times;</button>
        <form method="dialog">
            <h2>Create Project</h2>
            <label for="project-title">Project Title:</label>
            <input type="text" id="project-title" required>
            <label for="project-description">Description:</label>
            <textarea id="project-description" required></textarea>
            <button class="cbtn" type="button">Confirm</button>
        </form>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    const closeButton = modal.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', () => {
        modal.close();
        modal.remove();
    });

    const confirmButton = modal.querySelector('.cbtn');
    confirmButton.addEventListener('click', () => {
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;

        if (!title || !description) {
            alert('Please fill in all fields.');
            return;
        }

        // Create a new project div
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item');
        projectDiv.textContent = title;


        // Add a delete button for the project
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-project-btn');
        projectDiv.appendChild(deleteButton);

        projectContainer.appendChild(projectDiv);

        // Enable the "Add To-Do" button if a project exists
        if (projectContainer.children.length === 0) {
            addbtn.disabled = true;
            addbtn.title = "Please create a project first!";
        } else {
            addbtn.disabled = false;
            addbtn.title = "";
        }

        // Automatically select the newly created project
        projectDiv.click();

        // Highlight the selected project
        projectDiv.addEventListener('click', () => {
            document.querySelectorAll('.project-item').forEach(item => item.style.backgroundColor = '');
            projectDiv.style.backgroundColor = '#34495e';

            activeProject = title; // Set the active project

            // Update the main content title and description
            document.querySelector('.titleh1').textContent = title;
            document.querySelector('.Descriptionpara').textContent = description;

            // Filter and render todos for the selected project
            updateContent();

            
        });

        // Delete project logic
        deleteButton.addEventListener('click', () => {
            const warningModal = document.createElement('dialog');
            warningModal.classList.add('modal');
            warningModal.innerHTML = `
                <h2>Are you sure?</h2>
                <p>Deleting this project will remove all associated to-dos.</p>
                <button class="confirm-delete-btn">Yes, Delete</button>
                <button class="cancel-delete-btn">Cancel</button>
            `;

            document.body.appendChild(warningModal);
            warningModal.showModal();

            const confirmDeleteButton = warningModal.querySelector('.confirm-delete-btn');
            const cancelDeleteButton = warningModal.querySelector('.cancel-delete-btn');

            confirmDeleteButton.addEventListener('click', () => {
                // Remove the project and its todos
                projectDiv.remove();
                activeProject = null;
                updateContent();
                warningModal.close();
                warningModal.remove();
            });

            cancelDeleteButton.addEventListener('click', () => {
                warningModal.close();
                warningModal.remove();
            });
        });

        modal.close();
        modal.remove();
    });
});

// Function to update the content area
function updateContent() {
    content.innerHTML = '';
    const projectTodos = todos.filter(todo => todo.project === activeProject);

    if (projectTodos.length === 0) {
        content.innerHTML = `
            <div class="instructions">
                <h2>Welcome to the To-Do List App!</h2>
                <p>1. Please create a project (you need to create a project before creating a to-do).</p>
                <p>2. Create to-dos for your project.</p>
            </div>
        `;
    } else {
        projectTodos.forEach(todo => todo.render());
    }
}

// Call updateContent on page load to show instructions initially
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});

export const main = document.querySelector(".main-content");
export {activeProject}