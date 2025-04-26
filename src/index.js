import './styles.css';
import { main } from './sidebar.js'; //importing the main content

const todos = []; //array to store all todos
const addbtn = document.querySelector('.add-todo-btn');
//modal for the add button
const modal = document.createElement('dialog');
modal.classList.add('modal');


//constructor for the to-do list
class TodoList {
    constructor(title, description,date, priority, isCompleted) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isCompleted = isCompleted;

        function render() {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <p>${this.date}</p>
                <p>${this.priority}</p>
                <button class="toggle-completion">${this.isCompleted ? 'Undo' : 'Complete'}</button>
            `;
            return todoItem;
        }
        // Add the new todo to the todos array
        todos.push(this);
        // Render the todo item
        const todoItem = render.call(this);
        // Append the todo item to the main content
        main.appendChild(todoItem);
        // Add event listener to the toggle completion button
        const toggleButton = todoItem.querySelector('.toggle-completion');
        toggleButton.addEventListener('click', () => {
            this.toggleCompletion();
            toggleButton.textContent = this.isCompleted ? 'Undo' : 'Complete';
            todoItem.classList.toggle('completed', this.isCompleted);
        });

        

        

    

        

    }


    // to toggle the completion status of the todo
    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
    
    }

    





//event listener for the add button to create a 
// modal for inputing the data for the todo
// Event listener for the "Add To-Do" button
addbtn.addEventListener('click', function () {
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

    // Close the modal when the close button is clicked
    const closeButton = modal.querySelector('.modal-close-btn');
    closeButton.addEventListener('click', () => {
        modal.close();
        setTimeout(() => {
            modal.remove();
        }, 10); // Delay before removing the modal
    });
});

// Event listener for submitting the form (added only once)
modal.addEventListener('click', function (s) {
    if (s.target.classList.contains('sbtn')) {
        s.preventDefault();

        // Get input values
        const titlevalue = document.getElementById('title').value;
        const descriptionvalue = document.getElementById('description').value;
        const datevalue = document.getElementById('date').value;
        const priorityvalue = document.getElementById('priority').value;

        // Validate inputs
        if (!titlevalue || !descriptionvalue || !datevalue || !priorityvalue) {
            alert("Please fill in all fields.");
            return;
        }

        // Create the to-do
        const isCompleted = false;
        const todo = new TodoList(titlevalue, descriptionvalue, datevalue, priorityvalue, isCompleted);
        

        // Close the modal after a delay
        setTimeout(() => {
            modal.close();
            modal.remove();
        }, 10); // 10ms delay
    }
});
    




    export default TodoList;


