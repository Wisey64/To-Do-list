import './styles.css';
import { main } from './sidebar.js'; // Importing the main content
import { activeProject } from './sidebar.js';

const content = document.querySelector('.todo-list');
const todos = []; // Array to store all todos
const addbtn = document.querySelector('.add-todo-btn');

// Modal for the add button
const modal = document.createElement('dialog');
modal.classList.add('modal');

// Centralized rendering function
function renderAllTodos() {
    // Clear the current content
    content.innerHTML = '';

    // Render all to-dos from the array
    todos.forEach(todo => todo.render());
}

// Constructor for the to-do list
class TodoList {
    constructor(title, description, date, priority, isCompleted, project = null) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.project = project; // Associate the to-do with the active project

        // Add the new to-do to the todos array
        todos.push(this);

        // Render the to-do
        this.render();
    }

    // Method to render the to-do
    render() {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <div class="todo-header" style="border-top: 5px solid ${this.getPriorityColor()}">
                <h3>${this.title}</h3>
            </div>
            <p>${this.description}</p>
            <p>${this.date}</p>
            <div class="todo-footer">
                <label>
                    <input type="checkbox" class="complete-checkbox" ${this.isCompleted ? 'checked' : ''}>
                    Complete
                </label>
            </div>
            <div class="todo-actions">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        content.appendChild(todoItem);

        // Add event listeners for delete and edit
        const deleteButton = todoItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => this.delete(todoItem));

        const editButton = todoItem.querySelector('.edit-btn');
        editButton.addEventListener('click', () => this.edit(todoItem));

        const completeCheckbox = todoItem.querySelector('.complete-checkbox');
        completeCheckbox.addEventListener('change', () => {
            this.isCompleted = completeCheckbox.checked;
            todoItem.classList.toggle('completed', this.isCompleted);
        });
    }

    // Method to delete the to-do
    delete(todoItem) {
        todoItem.remove();
        const index = todos.indexOf(this);
        if (index > -1) todos.splice(index, 1);
    }

    // Method to edit the to-do
    edit(todoItem) {
        modal.innerHTML = `
            <button class="modal-close-btn">&times;</button>
            <form method="dialog">
                <h2>Edit Todo</h2>
                <label for="title">Title:</label>
                <input type="text" id="title" class="ttl" value="${this.title}" required>
                <label for="description">Description:</label>
                <textarea id="description" class="desc" required>${this.description}</textarea>
                <label for="date">Date:</label>
                <input type="date" id="date" class="dat" value="${this.date}" required>
                <label for="priority">Priority:</label>
                <select id="priority" class="prio" required>
                    <option value="High" ${this.priority === 'High' ? 'selected' : ''}>High</option>
                    <option value="Medium" ${this.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="Low" ${this.priority === 'Low' ? 'selected' : ''}>Low</option>
                </select>
                <button class="cbtn" type="button">Confirm</button>
            </form>
        `;

        main.appendChild(modal);
        modal.showModal();

        const closeButton = modal.querySelector('.modal-close-btn');
        closeButton.addEventListener('click', () => {
            modal.close();
            setTimeout(() => {
                modal.remove();
            }, 10);
        });

        const confirmButton = modal.querySelector('.cbtn');
        confirmButton.addEventListener('click', () => {
            const titlevalue = document.getElementById('title').value;
            const descriptionvalue = document.getElementById('description').value;
            const datevalue = document.getElementById('date').value;
            const priorityvalue = document.getElementById('priority').value;

            if (!titlevalue || !descriptionvalue || !datevalue || !priorityvalue) {
                alert("Please fill in all fields.");
                return;
            }

            this.title = titlevalue;
            this.description = descriptionvalue;
            this.date = datevalue;
            this.priority = priorityvalue;

            todoItem.querySelector('h3').textContent = this.title;
            todoItem.querySelector('p:nth-of-type(1)').textContent = this.description;
            todoItem.querySelector('p:nth-of-type(2)').textContent = this.date;
            todoItem.querySelector('.todo-header').style.borderTop = `5px solid ${this.getPriorityColor()}`;

            modal.close();
            setTimeout(() => {
                modal.remove();
            }, 10);
        });
    }

    // Method to get the color based on priority
    getPriorityColor() {
        if (this.priority === 'High') return 'red';
        if (this.priority === 'Medium') return 'yellow';
        if (this.priority === 'Low') return 'green';
    }
}

// Event listener for the "Add Todo" button
addbtn.addEventListener('click', function () {

    if (!activeProject) {
        alert("Please select a project first!");
        return;
    }



    modal.innerHTML = `
        <button class="modal-close-btn">&times;</button>
        <form method="dialog">
            <h2>Add Todo</h2>
            <label for="title">Title:</label>
            <input type="text" id="title" class="ttl" required>
            <label for="description">Description:</label>
            <textarea id="description" class="desc" required></textarea>
            <label for="date">Date:</label>
            <input type="date" id="date" class="dat" required>
            <label for="priority">Priority:</label>
            <select id="priority" class="prio" required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button class="sbtn" type="submit">Add Todo</button>
        </form>
    `;

    main.appendChild(modal);
    modal.showModal();

    const closeButton = modal.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', () => {
        modal.close();
        setTimeout(() => {
            modal.remove();
        }, 10);
    });

    const confirmButton = modal.querySelector('.sbtn');
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();

        const titlevalue = document.getElementById('title').value;
        const descriptionvalue = document.getElementById('description').value;
        const datevalue = document.getElementById('date').value;
        const priorityvalue = document.getElementById('priority').value;

        if (!titlevalue || !descriptionvalue || !datevalue || !priorityvalue) {
            alert("Please fill in all fields.");
            return;
        }

        const isCompleted = false;
        new TodoList(titlevalue, descriptionvalue, datevalue, priorityvalue, isCompleted, activeProject);

        // Remove the instructions div if it exists
        const instructionsDiv = document.querySelector('.instructions');
        if (instructionsDiv) {
            instructionsDiv.remove();
        }

        setTimeout(() => {
            modal.close();
            modal.remove();
            console.log("Confirm button clicked");
console.log("Modal closing...");
        }, 10);
    });
});




export { renderAllTodos, todos };
export default TodoList;